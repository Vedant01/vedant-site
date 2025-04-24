import { classes } from '~/utils/style';
import styles from './icon.module.css';
import { forwardRef } from 'react';

// Update sprite path to use public directory
const sprites = '/assets/icons.svg';

export const Icon = forwardRef(({ icon, className, size, ...rest }, ref) => {
  return (
    <svg
      aria-hidden
      ref={ref}
      className={classes(styles.icon, className)}
      width={size || 24}
      height={size || 24}
      {...rest}
    >
      <use href={`${sprites}#${icon}`} />
    </svg>
  );
});
