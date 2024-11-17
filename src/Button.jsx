/** @jsxImportSource @emotion/react */

export default function Button({label, action, style, type}) {
  return (
    <button
      css={style}
      onClick={action}
      type={type ? type : 'button'}
    >
      {label}
    </button>
  );
}
