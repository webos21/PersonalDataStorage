// in-project
import LoginForm from './LoginForm';

const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-screen gap-4">
            <div className="w-[350px] bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="h-[300px] flex items-center p-4">
                    <LoginForm />
                </div>
            </div>
            <div className="w-[400px] bg-blue-700 text-white rounded-lg p-6 text-center">
                <div className="h-[300px] flex flex-col justify-center items-center gap-4">
                    <h3 className="text-3xl font-bold">PersonalDataStorage Web</h3>
                    <hr className="w-full border-t border-blue-400" />
                    <p className="text-left">
                        개인자료보관소 App은 개인의 다양한 데이터를 보관하게 하는 유용한 도구입니다. 여기에 사용 편의성을 돕는
                        웹페이지를 App이 서비스 해 줍니다.
                    </p>
                    <a
                        href="https://webos21.github.io/PersonalDataStorage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
                    >
                        홈페이지 가기
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
