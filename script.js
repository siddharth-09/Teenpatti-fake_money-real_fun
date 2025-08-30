
        let players = [];
        let currentPlayerIndex = 0;
        let totalPot = 0;
        let currentStake = 0;
        let bootAmount = 10;
        let gameActive = false;
        let gameVariation = 'classic';
        
        function startNewGame() {
            const numPlayers = document.getElementById('numPlayers').value;
            bootAmount = parseInt(document.getElementById('bootAmount').value);
            gameVariation = document.getElementById('gameVariation').value;
            
            if (players.length < 3) {
                alert('You need at least 3 players to start the game!');
                return;
            }
            
            // Collect boot from all players
            totalPot = 0;
            players.forEach(player => {
                if (player.balance >= bootAmount) {
                    player.balance -= bootAmount;
                    totalPot += bootAmount;
                    player.status = 'active';
                    player.currentBet = bootAmount;
                } else {
                    alert(`${player.name} doesn't have enough balance for boot amount!`);
                    return;
                }
            });
            
            currentStake = bootAmount;
            currentPlayerIndex = 0;
            gameActive = true;
            
            updateDisplay();
            logAction(`New ${gameVariation} game started! Boot: ₹${bootAmount} collected from each player.`);
        }
        
        function resetGame() {
            players.forEach(player => {
                player.status = 'active';
                player.playerType = 'blind';
                player.currentBet = 0;
            });
            totalPot = 0;
            currentStake = 0;
            currentPlayerIndex = 0;
            gameActive = false;
            updateDisplay();
            logAction('Game reset. Ready for new round.');
        }
        
        function showAddPlayerModal() {
            document.getElementById('addPlayerModal').style.display = 'block';
        }
        
        function addPlayer() {
            const name = document.getElementById('playerName').value;
            const balance = parseInt(document.getElementById('playerBalance').value);
            
            if (!name || balance < 1) {
                alert('Please enter valid player details!');
                return;
            }
            
            if (players.length >= 6) {
                alert('Maximum 6 players allowed!');
                return;
            }
            
            const newPlayer = {
                id: Date.now(),
                name: name,
                balance: balance,
                status: 'active', // active, folded
                playerType: 'blind', // blind, seen
                currentBet: 0
            };
            
            players.push(newPlayer);
            updateDisplay();
            closeModal('addPlayerModal');
            logAction(`${name} joined the game with ₹${balance} balance.`);
            
            // Clear form
            document.getElementById('playerName').value = '';
            document.getElementById('playerBalance').value = '1000';
        }
        
        function removePlayer(playerId) {
            players = players.filter(p => p.id !== playerId);
            updateDisplay();
            logAction('Player removed from game.');
        }
        
        function placeBet(type) {
            if (!gameActive) {
                alert('Please start a new game first!');
                return;
            }
            
            const currentPlayer = players[currentPlayerIndex];
            const betAmount = parseInt(document.getElementById('betAmount').value);
            
            if (!betAmount || betAmount < 1) {
                alert('Please enter a valid bet amount!');
                return;
            }
            
            if (currentPlayer.balance < betAmount) {
                alert(`${currentPlayer.name} doesn't have enough balance!`);
                return;
            }
            
            // Validate bet based on rules
            if (type === 'blind') {
                if (betAmount < currentStake || betAmount > currentStake * 2) {
                    alert(`Blind bet must be between ₹${currentStake} and ₹${currentStake * 2}`);
                    return;
                }
                currentPlayer.playerType = 'blind';
                currentStake = betAmount;
            } else if (type === 'seen') {
                if (betAmount < currentStake * 2 || betAmount > currentStake * 4) {
                    alert(`Seen bet must be between ₹${currentStake * 2} and ₹${currentStake * 4}`);
                    return;
                }
                currentPlayer.playerType = 'seen';
                currentStake = Math.floor(betAmount / 2);
            }
            
            // Place the bet
            currentPlayer.balance -= betAmount;
            currentPlayer.currentBet = betAmount;
            totalPot += betAmount;
            
            logAction(`${currentPlayer.name} placed ${type} bet of ₹${betAmount}. New stake: ₹${currentStake}`);
            
            nextPlayer();
            updateDisplay();
        }
        
        function foldPlayer() {
            if (!gameActive) return;
            
            const currentPlayer = players[currentPlayerIndex];
            currentPlayer.status = 'folded';
            
            logAction(`${currentPlayer.name} folded.`);
            
            // Check if only one player remains
            const activePlayers = players.filter(p => p.status === 'active');
            if (activePlayers.length === 1) {
                endRound(activePlayers[0]);
                return;
            }
            
            nextPlayer();
            updateDisplay();
        }
        
        function showSideshow() {
            const activePlayers = players.filter(p => p.status === 'active');
            if (activePlayers.length < 3) {
                alert('Sideshow only available when 3+ players remain!');
                return;
            }
            
            const currentPlayer = players[currentPlayerIndex];
            if (currentPlayer.playerType === 'blind') {
                alert('Blind players cannot request sideshow!');
                return;
            }
            
            // Populate sideshow targets (previous seen players)
            const sideshowTarget = document.getElementById('sideshowTarget');
            sideshowTarget.innerHTML = '';
            
            players.forEach((player, index) => {
                if (player.status === 'active' && player.playerType === 'seen' && index !== currentPlayerIndex) {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = player.name;
                    sideshowTarget.appendChild(option);
                }
            });
            
            if (sideshowTarget.children.length === 0) {
                alert('No valid players for sideshow!');
                return;
            }
            
            document.getElementById('sideshowCost').textContent = currentStake * 2;
            document.getElementById('sideshowModal').style.display = 'block';
        }
        
        function requestSideshow() {
            const targetIndex = document.getElementById('sideshowTarget').value;
            const currentPlayer = players[currentPlayerIndex];
            const targetPlayer = players[targetIndex];
            const cost = currentStake * 2;
            
            if (currentPlayer.balance < cost) {
                alert('Not enough balance for sideshow!');
                return;
            }
            
            currentPlayer.balance -= cost;
            totalPot += cost;
            
            logAction(`${currentPlayer.name} requested sideshow with ${targetPlayer.name} for ₹${cost}`);
            logAction(`Target player can accept/deny. If accepted, compare cards and loser folds.`);
            
            closeModal('sideshowModal');
            nextPlayer();
            updateDisplay();
        }
        
        function showFinalShow() {
            const activePlayers = players.filter(p => p.status === 'active');
            if (activePlayers.length !== 2) {
                alert('Final show only available when exactly 2 players remain!');
                return;
            }
            
            const currentPlayer = players[currentPlayerIndex];
            let cost;
            
            if (currentPlayer.playerType === 'blind') {
                cost = currentStake;
            } else {
                cost = currentStake * 2;
            }
            
            document.getElementById('showCost').textContent = cost;
            document.getElementById('showModal').style.display = 'block';
        }
        
        function finalShow() {
            const currentPlayer = players[currentPlayerIndex];
            const cost = currentPlayer.playerType === 'blind' ? currentStake : currentStake * 2;
            
            if (currentPlayer.balance < cost) {
                alert('Not enough balance for show!');
                return;
            }
            
            currentPlayer.balance -= cost;
            totalPot += cost;
            
            logAction(`${currentPlayer.name} called for final show! Cost: ₹${cost}`);
            logAction('Compare cards now! Winner takes the pot of ₹' + totalPot);
            
            closeModal('showModal');
            
            // You would determine winner here based on actual cards
            // For now, just log the action
            logAction('Determine winner based on hand rankings and award the pot!');
        }
        
        function endRound(winner) {
            winner.balance += totalPot;
            logAction(`🏆 ${winner.name} wins the round and takes ₹${totalPot}!`);
            gameActive = false;
            updateDisplay();
        }
        
        function nextPlayer() {
            do {
                currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            } while (players[currentPlayerIndex].status === 'folded' && players.filter(p => p.status === 'active').length > 1);
        }
        
        function updateDisplay() {
            // Update players list
            const container = document.getElementById('playersContainer');
            container.innerHTML = '';
            
            players.forEach((player, index) => {
                const playerDiv = document.createElement('div');
                playerDiv.className = 'player-item';
                
                const isCurrentPlayer = index === currentPlayerIndex && gameActive;
                if (isCurrentPlayer) {
                    playerDiv.style.border = '2px solid #ffd700';
                }
                
                playerDiv.innerHTML = `
                    <div>
                        <strong>${player.name}</strong> ${isCurrentPlayer ? '👈' : ''}
                        <div>Balance: ₹${player.balance}</div>
                        ${player.currentBet > 0 ? `<div>Current Bet: ₹${player.currentBet}</div>` : ''}
                    </div>
                    <div class="player-status">
                        <span class="status-badge status-${player.status}">${player.status.toUpperCase()}</span>
                        <span class="status-badge status-${player.playerType}">${player.playerType.toUpperCase()}</span>
                        <button class="btn btn-danger" onclick="removePlayer(${player.id})" style="padding: 5px 10px; font-size: 12px;">Remove</button>
                    </div>
                `;
                container.appendChild(playerDiv);
            });
            
            // Update current player dropdown
            const currentPlayerSelect = document.getElementById('currentPlayer');
            currentPlayerSelect.innerHTML = '';
            players.forEach((player, index) => {
                if (player.status === 'active') {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = player.name;
                    if (index === currentPlayerIndex) option.selected = true;
                    currentPlayerSelect.appendChild(option);
                }
            });
            
            // Update game state
            document.getElementById('totalPot').textContent = '₹' + totalPot;
            document.getElementById('currentStake').textContent = currentStake;
            document.getElementById('playersRemaining').textContent = players.filter(p => p.status === 'active').length;
            
            // Update bet amount suggestion
            const betInput = document.getElementById('betAmount');
            if (players[currentPlayerIndex]) {
                const player = players[currentPlayerIndex];
                if (player.playerType === 'blind') {
                    betInput.placeholder = `Blind: ${currentStake} - ${currentStake * 2}`;
                } else {
                    betInput.placeholder = `Seen: ${currentStake * 2} - ${currentStake * 4}`;
                }
            }
        }
        
        function logAction(action) {
            const logDiv = document.getElementById('gameLog');
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.innerHTML = `<small>${new Date().toLocaleTimeString()}</small><br>${action}`;
            logDiv.appendChild(entry);
            logDiv.scrollTop = logDiv.scrollHeight;
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }
        
        // Event listeners
        document.getElementById('currentPlayer').addEventListener('change', function() {
            currentPlayerIndex = parseInt(this.value);
            updateDisplay();
        });
        
        // Close modals when clicking outside
        window.onclick = function(event) {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        // Initialize display
        updateDisplay();
