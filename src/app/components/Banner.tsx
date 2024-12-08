import { Links } from "./Links";

export default function Banner() {
  return (
    <header className="flex flex-row items-center justify-between bg-neutral-800 px-5 py-3 shadow-md">
      <div className="flex flex-row">
        <img src="d20.svg" width={27}></img>
        <h1 className="mx-4 mb-1 text-2xl font-semibold text-white">
          Dungeon Master Assistant
        </h1>
      </div>
      <Links></Links>
    </header>
  );
}
