import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="w-full max-w-md mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold text-black mb-8">
              Login
          </h1>

      <LoginForm />
    </main>
  );
}
