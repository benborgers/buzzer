import { Button } from '@/Components/button';
import { Field, Label } from '@/Components/fieldset';
import { Heading } from '@/Components/heading';
import { Input } from '@/Components/input';
import { Select } from '@/Components/select';
import { TEAMS } from '@/constants';
import { PageProps } from '@/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const NAME_LOCAL_STORAGE_KEY = 'buzzer--user_name';
const TEAM_LOCAL_STORAGE_KEY = 'buzzer--team_name';

type Props = {
  game_id: number;
};

export default function PlayPage(props: PageProps<Props>) {
  const [profileOpen, setProfileOpen] = useState(false);

  const [name, setName] = useState('');
  const [team, setTeam] = useState('');

  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [correct, setCorrect] = useState<string[]>([]);

  useEffect(() => {
    const name = localStorage.getItem(NAME_LOCAL_STORAGE_KEY) || '';
    const team = localStorage.getItem(TEAM_LOCAL_STORAGE_KEY) || '';

    setName(name);
    setTeam(team);

    if (!(name && team)) {
      setProfileOpen(true);
    }
  }, []);

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem(NAME_LOCAL_STORAGE_KEY, name);
    localStorage.setItem(TEAM_LOCAL_STORAGE_KEY, team);

    setProfileOpen(false);
  };

  const handleGuessSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setGuesses([guess, ...guesses]);

    fetch(route('answers.create', props.game_id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': props.csrfToken,
      },
      body: JSON.stringify({ title: guess, user_name: name, team_name: team }),
    })
      .then((res) => res.json())
      .then((json: { is_correct: boolean }) => {
        if (json.is_correct) {
          setCorrect([guess, ...correct]);
        }
      });

    setGuess('');
  };

  return (
    <div>
      <AnimatePresence initial={false}>
        {profileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100vh' }}
            exit={{ height: 0 }}
            className="absolute inset-0 z-10 overflow-hidden bg-zinc-200"
          >
            <div className="p-4 pt-6">
              <Heading>Buzzer</Heading>

              <form onSubmit={handleProfileSubmit} className="mt-6 space-y-4">
                <Field>
                  <Label>Your name</Label>
                  <Input
                    name="user_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <Label>Team</Label>
                  <Select
                    name="team_name"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a team
                    </option>
                    {TEAMS.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </Select>
                </Field>
                <div className="flex justify-center pt-2">
                  <Button type="submit" className="w-full" color="teal">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0">
        <button
          onClick={() => setProfileOpen(true)}
          className="w-full bg-zinc-200 p-2 text-center"
        >
          <p className="font-semibold text-zinc-900">
            {name} — {team}
          </p>
        </button>

        <div className="p-4 pt-6">
          <Heading>Buzzer</Heading>

          <form onSubmit={handleGuessSubmit} className="mt-6">
            <Input
              placeholder="Your guess..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              required
            />
            <Button color="teal" type="submit" className="mt-4 w-full">
              Submit
            </Button>
          </form>

          <div className="mt-6">
            {guesses.map((guess, index) => {
              const isCorrect = correct.includes(guess);

              return (
                <p
                  key={index}
                  className={clsx(
                    'text-lg',
                    isCorrect && '-mx-4 bg-teal-600 px-4 font-bold text-white',
                  )}
                >
                  {guess} {isCorrect && '✓'}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
