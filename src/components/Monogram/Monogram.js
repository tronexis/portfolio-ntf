import { forwardRef, useId } from 'react';
import { classes } from 'utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;
  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="36"
      height="36"
      viewBox="0 0 216 216"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <polygon points="0 216 216 0 216 216 153 216 153 144 81 216 0 216" />
          <polygon points="171 0 54 0 0 0 0 54 0 171 54 117 54 54 117 54 171 0" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
