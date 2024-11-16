import KismetLogo from "./KismetLogo.svg";

export function BifrostScreenFooter() {
  return (
    <div className="flex items-center justify-center pt-4">
      made with{" "}
      <a href="https://makekismet.com/" target="_blank" className="ml-2">
        <img
          src={KismetLogo}
          alt="Kismet wordmark"
          className="pointer-events-none"
        />
      </a>
    </div>
  );
}
