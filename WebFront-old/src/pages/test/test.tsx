import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// project import
import ComponentSkeleton from '../../components/ComponentSkeleton';
import TimeUtil from '../../utils/TimeUtil';

// redux
import { authLogout, getUserInfo, removeUserInfo } from '../../store/reducers/auth';

const TEST_PORT = ':28080';
const REQ_URI = process.env.NODE_ENV !== 'production' ? '//' + window.location.hostname + TEST_PORT + '/pds/v1/auth' : '/pds/v1/auth';

const Test = () => {
    const userInfo = useSelector(getUserInfo);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserInfo = () => {
        let reqUri = REQ_URI + '/userInfo';

        fetch(reqUri, { method: 'GET' })
            .then((res) => {
                if (!res.ok) throw Error('서버응답 : ' + res.statusText);
                return res.json();
            })
            .then(resJson => console.log(resJson))
            .catch(error => console.log('UserInfo::fetch => ' + error));
    };

    const handleLogout = () => {
        dispatch(removeUserInfo());
        dispatch(authLogout());
        navigate('/logout');
    };

    return (
        <ComponentSkeleton>
            <div className="shadow p-4 bg-white">
                <h2 className="text-xl font-bold">사용자 인증 테스트 페이지</h2>
            </div>

            <div className="shadow p-4 mt-4 bg-white">
                <h3 className="text-lg font-bold border-b mb-4 pb-2">사용자 정보</h3>
                <div className="space-y-2">
                    <p>사용자ID : {userInfo.user}</p>
                    <hr />
                    <p>사용자명 : {userInfo.preferredUsername}</p>
                    <hr />
                    <p>전자우편 : {userInfo.email}</p>
                    <hr />
                    <p>등록그룹 :{userInfo.groups.join(', ')}</p>
                    <p>생성시각 :{TimeUtil.formatMilliToYMDhms(userInfo.createAt)}</p>
                    <p>폐기시각 :{TimeUtil.formatMilliToYMDhms(userInfo.expireOn)}</p>
                    <p>ID-Token :{userInfo.idToken}</p>
                    <p>Access-Token :{userInfo.accessToken}</p>
                    <p>Refresh-Token :{userInfo.refreshToken}</p>
                </div>
            </div>

            <div className="mt-4 p-4 border bg-gray-50 flex gap-2">
                <button onClick={handleUserInfo} className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded">
                    사용자 정보 확인
                </button>
                <button onClick={handleLogout} className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded">
                    로그아웃
                </button>
            </div>
        </ComponentSkeleton>
    );
};

export default Test;
