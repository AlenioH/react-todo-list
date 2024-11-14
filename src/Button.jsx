/** @jsxImportSource @emotion/react */

export default function Button({label, action, style}) {
  return (
    <button
      css={style}
      onClick={action}
    >
      {label}
    </button>
  );
}
