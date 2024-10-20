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
import { FunctionComponent } from "react";
interface MenuItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
}

type MenuCategoryItem = MenuItem & { categoryName: 'FINANCE' | 'INVESTIMENTS' | 'MINDSET' }

const categoryItems: MenuCategoryItem[] = [
  { name: "Finanças", href: "/blog/categorias/financas-basicas", categoryName: "FINANCE" },
  { name: "Investimentos", href: "/blog/categorias/investimentos-para-iniciantes", categoryName: "INVESTIMENTS" },
  { name: "Mentalidade", href: "/blog/categorias/mentalidade-financeira", categoryName: "MINDSET" },
]

const menuItems: MenuItem[] = [
  ...categoryItems,  
  { name: "Sobre", href: "/sobre" },
  { name: "Contato", href: "/contato" },
];
export const Navigation: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav>
      <div className="hidden md:flex items-center">
        {menuItems.map((item) => (
          <div key={item.href} className="ml-4 md:ml-8">
            <Link
              href={item.href}
              target={item.openInNewTab ? "_blank" : "_self"}
              className={cn(
                "hover:text-gray-900",
                pathname === item.href && "font-bold"
              )}
            >
              {item.name}
            </Link>
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
                {menuItems.map((item) => (
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
                  </Link>
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
  return (
    <section className="flex items-center justify-between mt-8 md:mt-16 mb-12">
      <Link href="/" className="md:-mt-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
          <Image alt={`Logo Bolso Extra`} src={`/images/bolsoextra.png`} height={100} width={150} />
        </h1>
      </Link>
      <Navigation />
    </section>
  );
};
