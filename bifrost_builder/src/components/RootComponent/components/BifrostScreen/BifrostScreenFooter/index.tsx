import KismetLogo from "./KismetLogo.svg";

export function BifrostScreenFooter() {
  return (
    <div className="flex items-center justify-center pt-4">
      made with{" "}
      <img
        src={KismetLogo}
        alt="Kismet wordmark"
        className="ml-2 pointer-events-none"
      />
    </div>
  );
}
