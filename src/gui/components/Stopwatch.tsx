import { useRef, useEffect } from 'react';

interface Props {
  start: Date;
  stop?: Date | undefined;
  updateInterval?: number;
};

function format(value: number, digits: number) {
  return (value < 0 ? '-' : '') + Math.abs(value).toString().padStart(digits, '0');
}

function formatElapsed(value: number) {

  const minutes = Math.floor(value % 3600000 / 60000);
  const seconds = Math.floor(value % 60000 / 1000);

  return `${format(minutes, 2)}:${format(seconds, 2)}`;
}

function formatElapsedFromDates(start: Date, stop: Date | undefined): string {
  return formatElapsed((stop || new Date()).getTime() - start.getTime());
}

export default function Stopwatch(props: Props) {

  const element = useRef<HTMLSpanElement | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {

    if (timer.current || props.stop) {

      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }

      if (element.current) {
        element.current.innerText = formatElapsedFromDates(props.start, props.stop);
      }
    }
  
    if (!props.stop) {
      timer.current = setInterval(() => {
        if (element.current) {
          element.current.innerText = formatElapsedFromDates(props.start, props.stop);
        }
      }, props.updateInterval || 1000);
    }

  }, [props.start, props.stop, props.updateInterval]);

  return (
    <span ref={element}>{formatElapsedFromDates(props.start, props.stop)}</span>
  );
}
