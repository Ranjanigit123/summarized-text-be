// summarizeController.js

const { summarizeText } = require('../utils/utils');
const SummarizedText = require('../model/summarizeModel');

exports.getSummarizedTextByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const summarizedTexts = await SummarizedText.find({
            user: userId
        });
        res.json({ summarizedTexts });
    } catch (error) {
        console.error('Error occurred while fetching summarized text:',
            error);
        res.status(500).json({
            error: 'An error occurred while fetching summarized text'
        });
    }
};


exports.summarize = async (req, res) => {
    const { text, userId, summaryLength } = req.body;
    try {
        const summarizedText = summarizeText(text, summaryLength);
        const newSummarizedText = new SummarizedText({
            user: userId,
            originalText: text,
            summarizedText: summarizedText
        });
        await newSummarizedText.save();

        res.json({ summary: summarizedText });
    } catch (error) {
        console.error('Error occurred during text summarization:', error);
        res.status(500).json({
            error: 'An error occurred during text summarization'
        });
    }
};


exports.deleteSummarizedText = async (req, res) => {
    const { textId } = req.params;
    try {
        const text = await SummarizedText.findOneAndDelete({ _id: textId });
        console.log(text);
        res.status(200).json({
            success: true,
            message: "Summary Text deleted successfully",
            text: text
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        });
    }
};
