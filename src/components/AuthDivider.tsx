// src/components/AuthDivider.tsx
import { Button } from "@/components/ui/button";

export function AuthDivider() {
  return (
    <>
      <Button variant="outline" className="w-full mb-4">
        <img src="/icons/mail.svg" className="w-4 h-4 mr-2" />
        Continue with Email
      </Button>
      <div className="flex items-center text-sm text-muted-foreground mb-4">
        <span className="flex-grow h-px bg-border" />
        <span className="px-2">or</span>
        <span className="flex-grow h-px bg-border" />
      </div>
    </>
  );
}
