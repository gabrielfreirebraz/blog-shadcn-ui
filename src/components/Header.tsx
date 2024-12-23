"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FunctionComponent, memo, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { RiCalculatorLine } from "react-icons/ri";
import { menuCategoryList } from "@/app/api/categoria/menu-list";
import { useTheme } from "next-themes";


const menuItems: MenuItem[] = [
  ...menuCategoryList,
  { name: "Materiais", href: "/material-de-apoio", dropdown: false },
  { name: "Sobre", href: "/sobre" },
];
export const Navigation: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav>
      <div className="hidden md:flex items-center">
        {menuItems.map((item: MenuItem) => (
          <div key={item.href} className="ml-4 md:ml-8">

            {item.dropdown ?
              <MemoizedDropdownMaterialMenu contentClassName={`w-80 p-4`} />
              :

              <Link
                href={item.href}
                target={item.openInNewTab ? "_blank" : "_self"}
                className={cn(
                  "hover:text-gray-900",
                  pathname === item.href && "font-bold"
                )}
              >
                {item.name}
              </Link>}
          </div>
        ))}

      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu size="24" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                {menuItems.map((item: MenuItem) => (
                  <div key={item.href}>
                    {item.dropdown ?
                      <DropdownMaterialMenu contentClassName={`w-72 p-6`} />
                      :

                      <Link
                        key={item.href}
                        href={item.href}
                        target={item.openInNewTab ? "_blank" : "_self"}
                        className={cn(
                          "block py-2",
                          pathname === item.href && "font-bold"
                        )}
                      >
                        {item.name}
                      </Link>}
                  </div>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export const Header: FunctionComponent = () => {
  const { resolvedTheme } = useTheme();

  return (
    <section className="flex items-center justify-between mt-8 md:mt-16 mb-12">
      <Link href="/" className="md:-mt-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
          <Image alt={`Logo Bolso Extra`} src={resolvedTheme === "dark" ? `/images/bolsoextra-darkmode.png` : `/images/bolsoextra.png`} height={100} width={150} />
        </h1>
      </Link>
      <Navigation />
    </section>
  );
};

function DropdownMaterialMenu({ contentClassName = `w-56` }: Readonly<{ contentClassName?: string }>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    // setIsOpen(true)
  };
  const handleMouseLeave = () => {
    // setIsOpen(false)
  };

  // const isMobile = useMediaQuery({ maxWidth: 768 }); 

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>

      <DropdownMenuTrigger asChild>
        <Link
          href={`#`}
          target={"_self"}
          className={cn(
            "block py-2 outline-none",
            // pathname === "material" && "font-bold"
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Materiais
        </Link>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(contentClassName)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <DropdownMenuLabel>Material de Apoio</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            Calculadora de 13 Salário
            <DropdownMenuShortcut>
              <RiCalculatorLine size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            Planilha de Gasto Mensal
            <DropdownMenuShortcut>
              <PiMicrosoftExcelLogoFill size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const MemoizedDropdownMaterialMenu = memo(DropdownMaterialMenu);