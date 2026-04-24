// in-project
import LoginForm from './LoginForm';

const Login = () => {
    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-100 via-zinc-100 to-blue-100 px-4 py-6 sm:px-6">
            <div className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-6xl items-center">
                <div className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-[minmax(320px,420px)_minmax(360px,1fr)] md:gap-6">
                <section className="rounded-2xl border border-white/70 bg-white/95 p-5 shadow-lg backdrop-blur sm:p-6">
                    <LoginForm />
                </section>

                <section className="rounded-2xl bg-blue-700 p-6 text-white shadow-lg sm:p-8">
                    <div className="flex h-full min-h-[280px] flex-col justify-center gap-5">
                        <h3 className="text-3xl font-extrabold leading-tight sm:text-4xl">PersonalDataStorage Web</h3>
                        <hr className="w-full border-t border-blue-300/70" />
                        <p className="text-sm leading-relaxed text-blue-50 sm:text-base">
                            개인자료보관소 App은 개인의 다양한 데이터를 보관하게 하는 유용한 도구입니다. 여기에 사용 편의성을 돕는
                            웹페이지를 App이 서비스 해 줍니다.
                        </p>
                        <div>
                            <a
                                href="https://webos21.github.io/PersonalDataStorage"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                            >
                                홈페이지 가기
                            </a>
                        </div>
                    </div>
                </section>
                </div>
            </div>
        </div>
    );
};

export default Login;
