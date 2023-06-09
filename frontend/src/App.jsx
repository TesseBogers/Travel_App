import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div></div>
      {/* I use text-6xl which is a tailwindcss utility class for font-size: 3.75rem = 60px  and adding heading as a class name to add our favorite color blue, which also work */}
      {/* This means that both tailwindcss and sass are working!!!!*/}
      <h1 className={"heading font-inder text-6xl"}>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* These are testing the fonts in they work using again both tailwindcss utility class and sass referencing the class. It also works!!!*/}
      <p className="s-m-b-10 font-inder text-2xl text-red-400">
        This is the sub title inder fonts using tailwindcss
      </p>
      <p className="font-sub-title">
        This is the sub title inder fonts using sass
      </p>
      <p className="s-font-2xl font-roboto text-green-400">
        Thiss is the title roboto fonts using tailwindcss
      </p>
      <p className="font-titles">This is the title roboto fonts using sass</p>
      <p className="font-signika-negative text-2xl text-yellow-500">
        This is the body text signika negative fonts using tailwindcss
      </p>
      <p className="font-body-text">
        This is the body text signika negative fonts using sass
      </p>

      <div className="s-font-sm">
        This text will have a font size of 0.875rem and a line-height of
        1.75rem.
      </div>
      <div className="s-font-base">
        This text will have a font size of 1rem and a line-height of 2rem.
      </div>

      <div className="s-font-xl">
        This text will have a font size of 1.25rem, but no line-height.
      </div>
      <div className="s-font-2xl s-m-b-32">
        This text will have a font size of 1.5rem, but no line-height.
      </div>

      <div className="mobile:w-1/2 tablet:w-1/3 laptop:w-2/3 large:w-full">
        This div will have different widths depending on the viewport size.
      </div>

      <div className="mobile:p-4 laptop:p-6">
        This div will have a padding of 1rem at mobile viewport sizes, and
        1.5rem at laptop viewport sizes.
      </div>

      <div className="mobile:mt-4 laptop:mr-6">
        This div will have a margin-top of 1rem at mobile viewport sizes, and a
        margin-right of 1.5rem at laptop viewport sizes.
      </div>
    </>
  );
}

export default App;
