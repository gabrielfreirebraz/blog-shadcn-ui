"use client";
import { config } from "@/config";
import { Rss } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "./ui/button";

export const Footer: FunctionComponent = () => {
  return (
    <section className="mt-8 md:mt-16 mb-12">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          © {config.blog.copyright} {new Date().getFullYear()}
        </div>
        <div className="text-xs text-muted-foreground hidden lg:block">
          <Link
            href={`/privacidade`}
          >
            Política de Privacidade
          </Link>
          &nbsp;•&nbsp;
          <Link
            target="_blank"
            href={`https://www.elevium.io`}
          >
            Blog desenvolvido por <strong>elevium</strong>
          </Link>
        </div>
        <div>
          <Link href="/rss">
            <Button variant="ghost" className="p-2">
              <Rss className="w-4 h-4" />
            </Button>
          </Link>
          <DarkModeToggle />
        </div>
      </div>
      <div className="text-xs text-muted-foreground lg:hidden">
        <Link
          href={`/privacidade`}
        >
          Política de Privacidade
        </Link>
        &nbsp;•&nbsp;
        <Link
          target="_blank"
          href={`https://www.elevium.io`}
        >
          Blog desenvolvido por <strong>elevium</strong>
        </Link>
      </div>
    </section>
  );
};
