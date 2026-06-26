import Header from "@/components/header/header";
import AnimateText from "@/components/UI/animateText";
import Button from "@/components/UI/button";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="p-6.25 w-screen h-screen bg-background grid grid-cols-1 md:grid-cols-2 items-center gap-5">
          <section className="flex flex-col gap-3">
            <section className="flex gap-5">
              <Button href='/register' classes='w-40 h-10'>Регистрация</Button>
              <Button href='/login' classes='w-40 h-10'>Вход</Button>
            </section>
            <div className="text-5xl font-sans">
              <div className="block bg-linear-to-r from-gradient-1 to-gradient-2 bg-clip-text text-transparent">
                Максимум
              </div>
              возможностей для общения
            </div>
            <AnimateText classes="text-2xl font-sans" delay={0}>Быстрое решение для вашего общения и решения задач</AnimateText>
            <Button href='/register' classes='w-80 h-12'>Попробуйте</Button>
          </section>
          <section className="w-full md:w-1/2"></section>
        </section>
      </main>
      <div className='h-screen'></div>
    </>
  );
}
