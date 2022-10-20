import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PaletteItem } from "../components/PaletteItem";
import { IPalette } from "../types";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [palettes, setPalettes] = useState<IPalette[]>([
    {
      id: "1",
      name: "Monochrome",
      colors: ["#fff", "#000", "#555"],
    },
    {
      id: "2",
      name: "Colorful",
      colors: ["pink", "yellow", "lightgreen", "orangered"],
    },
    {
      id: "3",
      name: "Shades of blue",
      colors: ["blue", "darkblue", "teal", "aqua", "lightblue"],
    },
  ]);
  const [usersPalettes, setUsersPalettes] = useState<IPalette[]>([
    {
      id: "4",
      name: "Monochrome",
      colors: ["#fff", "#000", "#555"],
    },
    {
      id: "5",
      name: "Colorful",
      colors: ["pink", "yellow", "lightgreen", "orangered"],
    },
    {
      id: "6",
      name: "Shades of blue",
      colors: ["blue", "darkblue", "teal", "aqua", "lightblue"],
    },
  ]);

  const [selPal, setSelPal] = useState("1");

  useEffect(() => {
    // Wait for session
    setTimeout(() => {
      if (!sessionData) {
        router.push("/login");
      }
    }, 1000);
  });

  return (
    <>
      <Head>
        <title>Palette</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col p-4">
        <h1 className="mb-4 flex flex-wrap text-4xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
          Wel<span className="mr-6 text-purple-300">come</span>
          {sessionData?.user?.name}
        </h1>
        <div className="your border-gray relative border-2">
          <div className="subtitle absolute left-2 -top-3.5 bg-white px-2">
            Your palettes
          </div>
          <div className="subtitle absolute right-2 -top-3.5 cursor-pointer rounded bg-white px-2 hover:bg-purple-200">
            Add new
          </div>
          <div className="palettes scrollbar-rounded-lg flex gap-6 overflow-auto  p-4 pb-8 scrollbar scrollbar-thumb-gray-200 ">
            {palettes.map((palette, index) => (
              <PaletteItem
                setSelPal={setSelPal}
                isMine={true}
                palette={palette}
                key={index}
                selected={palette.id === selPal}
              />
            ))}
          </div>
        </div>
        <div className="users border-gray relative mt-8 border-2">
          <div className="subtitle absolute left-2 -top-3.5 bg-white px-2">
            Users Palettes
          </div>
          <div className="palettes scrollbar-rounded-lg flex gap-6 overflow-auto  p-4 pb-8 scrollbar scrollbar-thumb-gray-200 ">
            {usersPalettes.map((palette, index) => (
              <PaletteItem
                setSelPal={setSelPal}
                isMine={false}
                palette={palette}
                key={index}
                selected={palette.id === selPal}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
