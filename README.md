index.js는 express 모듈을 이용하여 서버를 실행하는 파일이다.

database.js는 mysql2 모듈을 사용하였고, database 사용자 정보를 담고있는 부분이다.
secret.js는 jwt관련 비밀키를 저장하는 부분이다.

router 폴더는 각 라우터들이 담겨있는 폴더이다.
    userRouter에는 유저에 관련된 라우터들이 담겨있다.

controllers 폴더는 리우터로부터 신호가 온다면 데이터 검증을 하고 클라이언트에게 송신하는 부분이다.
    userController는 유저에 관련된 서비스들을 처리한다.

Service 폴더는 데이터베이스 관련 정보들을 처리한다.
    userService는 유저에 관련된 데이터베이스 쿼리문을 처리한다.
