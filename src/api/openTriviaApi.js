import axios from 'axios';

export const getQuestions = async (amount, category, difficulty) =>
  await axios.get(
    `https://opentdb.com/api.php?amount=${amount}&type=multiple${
      category ? `&category=${category}` : ''
    }${difficulty ? `&difficulty=${difficulty}` : ''}`
  );

export const postLeaderBoard = async (name, score) =>
  await axios.post(
    `https://mighty-hamlet-73526.herokuapp.com/api/leaderboard`,
    { name, score }
  );

export const getLeaderBoards = async () =>
  await axios.get(`https://mighty-hamlet-73526.herokuapp.com/api/leaderboard`);
