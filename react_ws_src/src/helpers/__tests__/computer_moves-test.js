jest.unmock('../computer_moves');
import {
  convert_cell_to_index,
  convert_index_to_cell,
  convert_move_coordinates_to_move_position_array,
  get_available_moves,
  get_board, get_computer_move,
  get_minimax,
  is_winner,
  normalize_move_coordinates,
} from '../computer_moves';

describe('computer_moves', () => {
  describe('convert_index_to_cell()', () => {
    it('should convert an index to a cell', () => {
      const index = 1;

      expect(convert_index_to_cell(index)).toEqual('c2');
    });
  });

  describe('convert_cell_to_index()', () => {
    it('should convert a cell to an index', () => {
      const cell = 'c5';

      expect(convert_cell_to_index(cell)).toEqual(4);
    });
  });

  describe('normalize_move_coordinates()', () => {
    it('should convert the current players move coordinates to an array', () => {
      const moves = {
        'c4': 'o', 'c7': 'x',
      };

      expect(normalize_move_coordinates(moves)).toEqual({
        3: 'o', 6: 'x',
      });
    });
  });

  describe('convert_move_coordinates_to_move_position_array()', () => {
    it('should convert the board move coordinates to an array of move positions', () => {
      const moves = {
        4: 'o', 5: 'x',
      };

      expect(convert_move_coordinates_to_move_position_array(moves)).toEqual([0, 1, 2, 3, 'o', 'x', 6, 7, 8]);
    });
  });

  describe('get_board()', () => {
    it('should get a board of size', () => {
      expect(get_board(9)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      expect(get_board(16)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    });
  });

  describe('get_available_moves()', () => {
    it('should get the available moves remaining', () => {
      expect(get_available_moves([0, 1, 2, 3, 'o', 'x', 6, 7, 8])).toEqual([0, 1, 2, 3, 6, 7, 8]);
      expect(get_available_moves(['o', 1, 'x', 'o', 'o', 'x', 'x', 7, 'o'])).toEqual([1, 7]);
    });
  });

  describe('is_winner()', () => {
    it('should return true when a player has a row completed', () => {
      expect(is_winner(['x', 'x', 'x', 'o', 'o', 'x', 'o', 7, 'o'], 'x')).toEqual(true);
    });

    it('should return true when a player has a column completed', () => {
      expect(is_winner(['o', 'x', 'x', 'o', 4, 'x', 'o', 7, 'o'], 'o')).toEqual(true);
    });

    it('should return true when a player has a diagonal completed', () => {
      expect(is_winner(['o', 'x', 'x', 'x', 'o', 'x', 'o', 7, 'o'], 'o')).toEqual(true);
      expect(is_winner([0, 'x', 'o', 'x', 'o', 'x', 'o', 7, 'o'], 'o')).toEqual(true);
    });

    it('should return false when a player has no winning move', () => {
      expect(is_winner(['o', 'x', 'x', 'x', 'o', 'x', 'o', 7, 'o'], 'x')).toEqual(false);
      expect(is_winner([0, 1, 2, 3, 4, 5, 6, 7, 8], 'o')).toEqual(false);
      expect(is_winner(['o', 'o', 2, 3, 4, 5, 6, 7, 8], 'o')).toEqual(false);
      expect(is_winner(['o', 1, 2, 3, 'o', 5, 6, 7, 8], 'o')).toEqual(false);
      expect(is_winner([0, 1, 'o', 3, 'o', 5, 6, 7, 8], 'o')).toEqual(false);
      expect(is_winner([0, 1, 'o', 3, 4, 'o', 6, 7, 8], 'o')).toEqual(false);
      expect(is_winner([0, 1, 2, 3, 4, 5, 6, 'o', 'o'], 'o')).toEqual(false);
    });
  });

  describe('get_minimax()', () => {
    it('should get the best next move for the player', () => {
      expect(get_minimax([0, 1, 2, 3, 4, 5, 6, 7, 8], 'o')).toEqual({ index: 0, score: 0 });
      expect(get_minimax([0, 1, 2, 3, 'x', 5, 6, 7, 8], 'o')).toEqual({ index: 0, score: 0 });
      expect(get_minimax(['o', 1, 2, 3, 'x', 5, 6, 7, 8], 'o')).toEqual({ index: 1, score: 0 });
      expect(get_minimax(['o', 'o', 'x', 3, 'x', 5, 6, 7, 8], 'o')).toEqual({ index: 6, score: 0 });
      expect(get_minimax(['o', 'o', 'x', 'x', 'x', 5, 'o', 7, 8], 'o')).toEqual({ index: 5, score: 0 });
    });
  });

  describe('get_computer_move()', () => {
    it('should get the best next move for the computer and return the cell', () => {
      expect(get_computer_move({})).toEqual('c1');
      expect(get_computer_move({ 'c5': 'x' })).toEqual('c1');
      expect(get_computer_move({ 'c1': 'o', 'c5': 'x' })).toEqual('c2');
      expect(get_computer_move({ 'c1': 'o', 'c2': 'o', 'c3': 'x', 'c5': 'x' })).toEqual('c7');
      expect(get_computer_move({ 'c1': 'o', 'c2': 'o', 'c3': 'x', 'c4': 'x', 'c5': 'x', 'c7': 'o' })).toEqual('c6');
    });
  });
});




