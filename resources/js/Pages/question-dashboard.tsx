import { Button } from '@/Components/button';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import useInterval from 'use-interval';

type Answer = {
  id: string;
  title: string;
  is_correct: boolean;
  team_name: string;
  user_name: string;
};

type Props = {
  index: number;
  total_questions: number;
  next_question_id: number | null;
  incorrect_answers: Answer[];
  team_to_correct_answer_count: Record<string, number>;
  first_win_team_name: string | null;
  correct_answer: string;
};

export default function QuestionDashboard({
  index,
  total_questions,
  next_question_id,
  incorrect_answers,
  team_to_correct_answer_count,
  first_win_team_name,
  correct_answer,
  CORRECT_ANSWERS_TO_WIN,
}: PageProps<Props>) {
  useInterval(() => {
    router.reload({ async: true });
  }, 500);

  return (
    <div className="grid h-screen grid-cols-2 grid-rows-[auto_1fr] gap-8 p-6">
      <div className="col-span-2 flex items-end justify-between">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          Question {index + 1} of {total_questions}
        </h1>

        {next_question_id && (
          <Button plain href={route('questions.show', next_question_id)}>
            Next Question
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-3xl bg-zinc-200 p-6">
        <h2 className="text-3xl font-medium tracking-tight text-zinc-950">
          Incorrect Guesses
        </h2>

        <div className="mt-4 space-y-1 overflow-hidden">
          {incorrect_answers.map((answer) => (
            <div key={answer.id} className="text-xl">
              <p className="font-medium text-zinc-900">
                {answer.title}
                <span className="text-xl text-zinc-400">
                  {' '}
                  ({answer.team_name})
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-zinc-200 p-6">
        {first_win_team_name && (
          <div className="mb-4 rounded-xl bg-emerald-600 p-4">
            <p className="text-3xl font-bold text-white">
              👑 {first_win_team_name}
            </p>
            <p className="mt-2 text-right text-xl font-semibold text-white">
              “{correct_answer}”
            </p>
          </div>
        )}

        <div className="space-y-2">
          {Object.entries(team_to_correct_answer_count)
            .sort((a, b) => b[1] - a[1])
            .map(([team_name, count]) => (
              <motion.div key={team_name} layout="position">
                <div className="text-xl font-medium text-zinc-800">
                  {team_name}
                </div>
                <div className="relative mt-0.5 h-8 overflow-hidden rounded-full border border-zinc-800">
                  <div
                    style={{
                      width: `${(count / CORRECT_ANSWERS_TO_WIN) * 100}%`,
                    }}
                    className={clsx(
                      'absolute inset-y-0 left-0 h-8 animate-[width] duration-200',
                      count >= CORRECT_ANSWERS_TO_WIN
                        ? 'bg-emerald-600'
                        : 'bg-zinc-800',
                    )}
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <p className="text-lg font-bold text-white">
                      {count}/{CORRECT_ANSWERS_TO_WIN}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
