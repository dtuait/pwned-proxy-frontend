export default function Footer() {
  return (
    <footer
      className="
        w-full 
        border-t 
        p-4 
        text-center 
        bg-deicGray 
        text-deicNavy
        dark:bg-tnStormBg
        dark:text-tnStormFg
        dark:border-tnStormAccent2
      "
    >
      <p className="text-sm">
        © {new Date().getFullYear()} My Next.js App
      </p>
    </footer>
  );
}
