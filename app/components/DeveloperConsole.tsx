"use client";

import { useEffect } from "react";

export default function DeveloperConsole() {
  useEffect(() => {
    console.log(
      `
%c
👀 YOU FOUND THE SECRET DEVELOPER ZONE

%c
🚀 THIS WEBSITE WAS BUILT BY

%c
███╗   ███╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ███╗ █████╗ ██████╗ 
████╗ ████║██╔═══██╗██║  ██║██╔══██╗████╗ ████║██╔══██╗██╔══██╗
██╔████╔██║██║   ██║███████║███████║██╔████╔██║███████║██║  ██║
██║╚██╔╝██║██║   ██║██╔══██║██╔══██║██║╚██╔╝██║██╔══██║██║  ██║
██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║██║  ██║██████╔╝
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ 

 █████╗  ██████╗  █████╗  ██████╗ 
██╔══██╗██╔════╝ ██╔══██╗██╔════╝ 
███████║██║  ███╗███████║██║  ███╗
██╔══██║██║   ██║██╔══██║██║   ██║
██║  ██║╚██████╔╝██║  ██║╚██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ 

%c
💻 Portfolio:
https://mohamadagag.vercel.app/

%c
You weren't supposed to be here...
but since you're here, respect for inspecting the code.
`,
      "font-size: 24px; font-weight: 900; color: #e11d48;",
      "font-size: 22px; font-weight: bold; color: white;",
      "font-size: 10px; font-weight: bold; color: #2563eb;",
      "font-size: 14px; font-weight: bold; color: #2563eb;",
      "font-size: 14px; color: #777;"
    );
  }, []);

  return null;
}
