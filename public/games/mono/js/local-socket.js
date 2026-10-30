// Browser-only replacement for the original Socket.io server.
// It runs the MonoGame engine locally and talks to the page through the same
// event names (room_update, play_card, draw_card, ...), so the original client
// code works unchanged. You always play against bots.
(function () {
    const ME = "me";
    const handlers = {};
    const game = new window.MonoGame("local", "Mono", "");
    game.addPlayer(ME, "You", false);

    function send(payload) {
        const data = JSON.parse(JSON.stringify(payload)); // same as network serialisation
        (handlers.room_update || []).forEach((fn) => fn(data));
    }

    function updateRoom(delay, nextBotDelay) {
        send({ room: game, delay: delay || 0 });
        playBots(nextBotDelay == null ? null : nextBotDelay);
    }

    function handleWin(winner) {
        send({ room: game, delay: 0, winnerId: winner.id });
        setTimeout(() => {
            game.resetToLobby();
            send({ room: game, delay: 0 });
        }, 1000);
    }

    function playBots(customDelay) {
        if (game.state === "l") return;
        if (game.current_player >= game.players.length) return;
        const current = game.players[game.current_player];
        if (!current.bot) return;

        let timerDuration;
        if (customDelay !== null && customDelay !== undefined) {
            timerDuration = customDelay;
        } else {
            const handSize = Math.max(1, current.hand.length);
            timerDuration = Math.floor(500 + Math.log(handSize) * 360 + Math.random() * 240);
        }
        const botMove = game.getBotMove();
        if (!botMove) return;
        const matchId = botMove.matchId;

        setTimeout(() => {
            if (game.state === "l") return;
            if (game.matchId !== matchId) return;
            const result = game.executeBotLogic();
            if (result && result.winner) {
                handleWin(result.winner);
                return;
            }
            updateRoom(0, result && result.keepTurn ? 400 : null);
        }, timerDuration);
    }

    const actions = {
        player_ready() {
            game.setReady(ME, true);
            game.tryStartGame();
            updateRoom();
        },
        draw_card() {
            game.drawCard(ME);
            updateRoom();
        },
        play_card(card) {
            const result = game.playCard(ME, card);
            if (result && result.winner) handleWin(result.winner);
            else updateRoom();
        },
        color_picker(color) {
            game.pickColor(ME, color);
            updateRoom();
        },
        add_bot() {
            if (game.players.length < 4) game.addBot();
            updateRoom();
        },
        remove_bot(botId) {
            game.removePlayer(botId);
            updateRoom();
        },
    };

    window.socket = {
        on(event, fn) {
            (handlers[event] = handlers[event] || []).push(fn);
        },
        emit(event, arg) {
            if (actions[event]) actions[event](arg);
        },
    };

    // Start straight away: you + 3 bots, no lobby screen.
    window.addEventListener("load", () => {
        game.addBot();
        game.addBot();
        game.addBot();
        setTimeout(() => {
            send({ room: game, delay: 0 });
            actions.player_ready();
        }, 250);
    });
})();
