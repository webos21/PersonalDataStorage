// project import
import ComponentSkeleton from '../../components/ComponentSkeleton';
import Logo from '../../components/Logo/Logo';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const HomeDefault = () => {
    return (
        <ComponentSkeleton>
            <div className="w-full">
                <div className="p-5 bg-gray-50">
                    <p className="text-right text-[#8d6e63] font-bold text-2xl font-['Malgun_Gothic']">
                        Auth v1.0
                    </p>
                    <h1 className="text-[#344457] font-extrabold text-5xl font-['Malgun_Gothic'] mt-2">
                        콜드체인 상태정보 관리 및<br />
                        실시간 모니터링체계 구축 기술 개발
                    </h1>
                    <h2 className="text-[#60879A] font-bold text-4xl font-['Malgun_Gothic'] mt-2">
                        통합 인증 페이지
                    </h2>
                    <div className="w-full lg:w-1/3 p-2 mt-5 mb-10 bg-[#344457] rounded-2xl">
                        <p className="text-center text-white font-bold text-xl font-['Malgun_Gothic']">
                            Keycloak을 활용한 SSO 서비스
                        </p>
                    </div>
                </div>
                <div className="mt-5 text-center bg-gray-50">
                    <Logo width="380px" height="90px" color="#005CAC" />
                    <h3 className="text-[#005CAC] font-bold text-2xl font-['Malgun_Gothic'] mt-2">
                        TCLS 서비스 플랫폼 (SL-C1000)
                    </h3>
                </div>
            </div>
        </ComponentSkeleton>
    );
};

export default HomeDefault;
