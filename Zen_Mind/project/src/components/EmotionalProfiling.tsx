import React, { useState, useEffect } from 'react';
import { Star, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Question {
  text: string;
  options: string[];
}

const generalQuestions: Question[] = [
  {
    text: "How often do you take time for self-care (e.g., hobbies, relaxation)?",
    options: ["Every day", "A few times a week", "Once in a while", "Almost never"]
  },
  {
    text: "Do you have someone you can talk to about your feelings?",
    options: ["Absolutely, always", "Most of the time", "Sometimes", "Not really"]
  },
  {
    text: "How do you feel about your current work or school situation?",
    options: ["I'm really happy with it", "It's going well", "It's okay", "I'm not satisfied"]
  },
  {
    text: "Do you often feel overwhelmed by your responsibilities?",
    options: ["Almost never", "Occasionally", "Quite often", "All the time"]
  },
  {
    text: "How would you rate your overall mental health?",
    options: ["Fantastic", "Good", "Could be better", "Not doing well"]
  },
  {
    text: "How comfortable are you with sharing your emotions and thoughts with others?",
    options: ["Very comfortable", "Pretty comfortable", "A bit uncomfortable", "Very uncomfortable"]
  },
  {
    text: "How often do you feel a sense of joy or contentment?",
    options: ["Almost always", "Often", "Sometimes", "Rarely"]
  },
  {
    text: "Do you feel like you have a good work-life balance?",
    options: ["Absolutely", "For the most part", "It's a bit off", "Not at all"]
  }
];

const metricQuestions: Question[] = [
  {
    text: "How do you distribute your screen time throughout the day?",
    options: ["Mostly during work/school hours", "Evenly spread throughout the day", "Mainly in the evening", "Constantly, all day"]
  },
  {
    text: "How physically active are you throughout the day?",
    options: ["Very active, I exercise regularly", "Moderately active, I move around quite a bit", "Occasionally active, I try to move when I can", "Mostly sedentary, I sit a lot"]
  },
  {
    text: "How often do you interact with friends or family in person?",
    options: ["Daily", "A few times a week", "Once a week", "Rarely"]
  },
  {
    text: "Do you use a heart rate tracker or other IoT devices to monitor stress levels?",
    options: ["Yes, and I check it regularly", "Yes, but I don't check it often", "No, but I am considering it", "No, I don't use one"]
  },
  {
    text: "How would you describe your current relationships with friends and family?",
    options: ["Very strong and supportive", "Good, but with some ups and downs", "Okay, but there's room for improvement", "Strained or distant"]
  },
  {
    text: "Do you keep a journal to track your thoughts and feelings?",
    options: ["Yes, daily", "Occasionally", "Rarely", "Never"]
  },
  {
    text: "How often do you consume alcohol or use drugs?",
    options: ["Never", "Occasionally", "Often", "Regularly"]
  },
  {
    text: "How consistent are you with your work or school schedule?",
    options: ["Very consistent, I stick to a routine", "Mostly consistent, with some variations", "Inconsistent, it varies a lot", "Very inconsistent, I struggle with routine"]
  },
  {
    text: "Considering all of the above, how would you rate your overall mental well-being?",
    options: ["I'm doing great, really happy", "I'm doing okay, but there's room for improvement", "I'm struggling, but managing", "I'm not doing well, and I need help"]
  }
];

const EmotionalProfiling: React.FC = () => {
  const [profilingType, setProfilingType] = useState<'general' | 'metric' | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [zenStars, setZenStars] = useState(() => {
    return parseInt(localStorage.getItem('zenStars') || '0');
  });
  const [showStarAnimation, setShowStarAnimation] = useState(false);

  useEffect(() => {
    localStorage.setItem('zenStars', zenStars.toString());
  }, [zenStars]);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    if (answers[questionIndex] === undefined) {
      setZenStars(prev => prev + 1);
      setShowStarAnimation(true);
      setTimeout(() => setShowStarAnimation(false), 1000);
    }
    
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const questions = profilingType === 'general' ? generalQuestions : metricQuestions;

  const generateAnalysis = async () => {
    setIsAnalyzing(true);
    const genAI = new GoogleGenerativeAI('AIzaSyDkUIP2nnVhRF61BOOA2XOS_uenKkYK49c');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const answerSummary = questions.map((question, index) => {
      const answerIndex = answers[index];
      return `Question: ${question.text}\nAnswer: ${question.options[answerIndex]}`;
    }).join('\n\n');

    const prompt = `As a mental health professional, analyze the following ${profilingType} profiling responses and provide an encouraging, supportive, and constructive analysis. Focus on strengths while gently addressing areas for growth. Include specific, actionable suggestions for improvement where appropriate. Here are the responses:\n\n${answerSummary}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAnalysis(response.text());
    } catch (error) {
      console.error('Error generating analysis:', error);
      setAnalysis('I apologize, but I was unable to generate your analysis at this time. Please try again later.');
    } finally {
      setIsAnalyzing(false);
      setIsComplete(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Emotional Profiling</h2>
        <p className="mt-2 text-gray-600">Understand your emotional well-being better</p>
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Star className="text-yellow-400 fill-yellow-400" size={24} />
          <span className="text-xl font-semibold text-gray-700">
            {zenStars} Zen-Stars
          </span>
        </div>
        {showStarAnimation && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="animate-bounce">
              <Star className="text-yellow-400 fill-yellow-400" size={48} />
            </div>
          </div>
        )}
      </div>

      {!profilingType && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setProfilingType('general')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-left"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">General Profiling</h3>
            <p className="text-gray-600">Answer questions about your general emotional state and well-being</p>
          </button>
          <button
            onClick={() => setProfilingType('metric')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-left"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Metric Profiling</h3>
            <p className="text-gray-600">Detailed questions about your daily habits and lifestyle</p>
          </button>
        </div>
      )}

      {profilingType && !isComplete && (
        <div className="space-y-8">
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">{question.text}</h3>
              <div className="space-y-3">
                {question.options.map((option, oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswer(qIndex, oIndex)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      answers[qIndex] === oIndex
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={generateAnalysis}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Complete Profiling
          </button>
        </div>
      )}

      {isComplete && (
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-50 px-6 py-3 rounded-full flex items-center space-x-2">
              <Star className="text-yellow-400 fill-yellow-400" size={24} />
              <span className="text-xl font-semibold text-purple-700">
                Total Zen-Stars earned: {zenStars}
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Analysis</h3>
          {isAnalyzing ? (
            <div className="flex items-center justify-center space-x-2 text-purple-600">
              <Loader className="animate-spin" size={24} />
              <span>Analyzing your responses...</span>
            </div>
          ) : (
            <div className="prose max-w-none">
              <div className="text-gray-700 mb-6 whitespace-pre-line">
                {analysis}
              </div>
            </div>
          )}
          <button
            onClick={() => {
              setProfilingType(null);
              setAnswers({});
              setIsComplete(false);
              setAnalysis('');
            }}
            className="mt-6 text-purple-600 hover:text-purple-700"
          >
            Start New Profiling
          </button>
        </div>
      )}
    </div>
  );
};

export default EmotionalProfiling;