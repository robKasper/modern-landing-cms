import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-20 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product Column */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Integrations</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Changelog</Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">API Docs</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Community</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Status</Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">Security</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2025 TaskFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
