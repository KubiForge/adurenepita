import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/awarenessData';
import { Button } from '../common/Button';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, Award, ArrowRight } from 'lucide-react';

interface InteractiveQuizProps {
  language?: 'en' | 'si';
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ language = 'en' }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIdx(idx);
    setHasAnswered(true);

    if (currentQ.options[idx].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setHasAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setHasAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="charcoal-card p-6 sm:p-8 max-w-2xl mx-auto border border-gold/30 shadow-2xl">
      {!quizFinished ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-light text-xs text-ivory/60">
            <span className="font-semibold text-gold flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              <span>Evidence-Based Drug Literacy Quiz</span>
            </span>
            <span>
              Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold font-heading text-ivory">
              {language === 'si' ? currentQ.questionSi : currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = 'bg-midnight/80 border-charcoal-light hover:border-gold/40 text-ivory/80';
              if (hasAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                } else if (selectedOptionIdx === idx) {
                  btnStyle = 'bg-red-950/80 border-red-500 text-red-200';
                } else {
                  btnStyle = 'bg-midnight/40 border-charcoal-light opacity-50 text-ivory/40';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-xl text-left border transition-all text-xs flex items-center justify-between ${btnStyle}`}
                >
                  <div>
                    <span className="font-medium text-sm block mb-0.5">{language === 'si' ? opt.textSi : opt.text}</span>
                  </div>

                  {hasAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 ml-2" />
                  )}
                  {hasAnswered && selectedOptionIdx === idx && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {hasAnswered && (
            <div className="p-4 rounded-xl bg-midnight border border-gold/30 text-xs space-y-2 animate-fade-in">
              <div className="font-bold text-champagne">Clinical Scientific Explanation:</div>
              <p className="text-ivory/80 leading-relaxed">{language === 'si' ? currentQ.explanationSi : currentQ.explanation}</p>
              <div className="text-[10px] text-ivory/40 pt-1 border-t border-charcoal-light">
                <strong>Citation:</strong> {currentQ.citation}
              </div>
            </div>
          )}

          {/* Next Button */}
          {hasAnswered && (
            <div className="flex justify-end pt-2">
              <Button variant="gold" size="md" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                {currentQuestionIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Quiz Results'}
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="text-center py-6 space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mx-auto shadow-gold-subtle">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-bold font-heading text-ivory">
              Quiz Completed!
            </h3>
            <div className="text-3xl font-bold font-mono text-champagne mt-3">
              {score} / {QUIZ_QUESTIONS.length} Correct
            </div>
            <p className="text-xs text-ivory/70 mt-2 max-w-md mx-auto">
              Knowledge is the strongest shield against drug experimentation, misinformation, and stigma. Thank you for testing your knowledge.
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <Button variant="charcoal" size="sm" onClick={handleRestart} leftIcon={<RotateCcw className="w-4 h-4" />}>
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
