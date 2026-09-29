import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { nav, productNav, site } from "@/lib/site";
import { track } from "@/lib/track";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div id="mobile-menu" className="mobile-menu">
      <nav className="mobile-menu__body" aria-label="Mobile">
        <ul>
          {nav.map((item, i) => (
            <li key={item.href} className={`rise v-d${i + 1}`}>
              <Link href={item.href} onClick={onClose} className="mobile-menu__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="rise v-d6 mt-10">
          <p className="mobile-menu__label">Product</p>
          <ul className="mobile-menu__products">
            {productNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={onClose} className="mobile-menu__product">
                  <span className="min-w-0 truncate">{item.label}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-fg-faint" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mobile-menu__actions">
        <a
          href={`${site.app}/login`}
          onClick={() => track("sign_in", { location: "mobile_menu" })}
          className="mobile-menu__btn mobile-menu__btn--ghost"
        >
          Sign in
        </a>
        <a
          href={`${site.app}/signup`}
          onClick={() => track("cta_start_free", { location: "mobile_menu" })}
          className="mobile-menu__btn mobile-menu__btn--solid"
        >
          Start free
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
