const BOARD_SIZE = 9;
const CELL_PREFIX = 'c';
const PLAYER = 'x';
const COMPUTER = 'o';

/**
 * Finds the best move for the computer using the minimax algorithm.
 * It converts the move index into the cell id used within the UI.
 *
 * NOTE: ideally we wouldn't have to convert between the cell id and the index since that is a UI concern.
 * Nevertheless, I felt it was better to encapsulate everything into 1 function. If I had more time I'd refactor
 * the component a bit to create clearer separation of concerns between the move logic and the presentation.
 */
export function get_computer_move(current_moves) {
  const board = convert_move_coordinates_to_move_position_array(normalize_move_coordinates(current_moves));
  const best_move = get_minimax(board, COMPUTER);
  return convert_index_to_cell(best_move.index);
}

/**
 * Adds the cell prefix and convert to one based index
 */
export function convert_index_to_cell(index) {
  return `${CELL_PREFIX}${index + 1}`;
}


/**
 * Remove the cell prefix and convert to zero based index
 */
export function convert_cell_to_index(cell) {
  return parseInt(cell.replace(CELL_PREFIX, ''), 10) - 1;
}

/**
 * Converts the move coordinates object to a zero based array
 */
export function normalize_move_coordinates(current_moves) {
  const normalized_moves = {};

  for (let [cell, player] of Object.entries(current_moves)) {
    normalized_moves[convert_cell_to_index(cell)] = player;
  }

  return normalized_moves;
}

/**
 * Gets a ttt board of the given size
 */
export function get_board(size) {
  return Array(size).fill().map((x, i) => i);
}

/**
 * Given the current moves by each player applies them to the board array
 */
export function convert_move_coordinates_to_move_position_array(current_moves) {
  const board = get_board(BOARD_SIZE);

  for (let [index, player] of Object.entries(current_moves)) {
    board[index] = player;
  }

  return board;
}

/**
 * Returns only the positions on the board that can be played
 */
export function get_available_moves(board) {
  return board.filter((position) => [PLAYER, COMPUTER].indexOf(position) === -1);
}

/**
 * Checks if the current ttt board (of any size) has a winner.
 */
export function is_winner(board, player) {
  // calculate the size of the board
  const size = Math.sqrt(board.length);

  for (let i = 0; i < size; i++) {
    let row = true;
    let col = true;
    for (let j = 0; j < size; j++) {
      // check the ith row and ith column
      row = row && (board[i * size + j] === player);
      col = col && (board[j * size + i] === player);
    }
    if (row || col) {
      return true;
    }
  }

  let diag1 = true;
  let diag2 = true;

  for (let i = 0; i < size; i++) {
    // check the diagonals
    diag1 = diag1 && (board[i * size + i] === player);
    diag2 = diag2 && (board[i * size + (size - i - 1)] === player);
  }

  return diag1 || diag2;
}

export function get_minimax(board, player) {
  const available_moves = get_available_moves(board);

  // checks for the final states: win, lose, and tie
  if (is_winner(board, PLAYER)) {
    return { score: -10 };
  } else if (is_winner(board, COMPUTER)) {
    return { score: 10 };
  } else if (available_moves.length === 0) {
    return { score: 0 };
  }

  const moves = [];

  // loop through available moves
  for (let i = 0; i < available_moves.length; i++) {
    const move = {};
    move.index = board[available_moves[i]];

    board[available_moves[i]] = player;

    // calculate the scores
    if (player === COMPUTER) {
      const result = get_minimax(board, PLAYER);
      move.score = result.score;
    } else {
      const result = get_minimax(board, COMPUTER);
      move.score = result.score;
    }

    board[available_moves[i]] = move.index;
    moves.push(move);
  }

  // if it is the computer's turn loop over the moves and choose the move with the highest score
  let bestMove;
  if (player === COMPUTER) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    // loop over the moves and choose the move with the lowest score
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}