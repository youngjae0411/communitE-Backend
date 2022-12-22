# communitE-Backend

E반에, E반에 의한, E반을 위한 E반 전용 커뮤티니 사이트 communitE-Backend 입니다!

</br>
<h1>1. 제작기간 및 팀원 소개</h1>

     2021년 12월 15일 ~ 22일 

     E반 1조 communitE 팀 

         백앤드 : 김영재, 김현우, 추교윤
         프론트 : 이재정, 전유진             
               
<h1>2. 사용기술</h1>

  <h3>Backend</h3>
      
      express
      MySQL
      Multer
      S3
      crypto

       
  <h3>Deploy</h3>
        
       Github Actions 
       Docker 
       AWS EC2
       AWS ECS
       AWS ECR
       
       
<h1>3. 실행화면 및 주소</h1>


<img width="1323" alt="스크린샷 2022-12-22 오후 4 24 01" src="https://user-images.githubusercontent.com/103705842/209112623-638a2e40-4a19-472b-8d79-c771cbabbc8a.png">

https://communit-e-frontend.vercel.app/


<h1> 4. 핵심기능 </h1>

    로그인/로그아웃, 회원가입
    게시물 CRUD, 댓글 CRUD, 유저 GET, POST, UPDATE
    게시물, 유저 사진 업로드
    

<h1> 5. Trouble Shooting </h1>


  1. CORS 에러
  배포 후 프론트랑 합치는 과정중 프론트쪽에서 CORS에러가 난다길래 CORS 라이브러리 설치로 해결했습니다.
  
  2. 게시글 수정 시 이미지를 등록했다 취소 시 null값으로 저장되는 문제 
  사진을 아예 내리고 싶을 땐 remove 버튼을 누르면 사진을 "null", 이미지를 등록 했다 취소 시 이미지의 바디값을 받지않아 undifined로 받는 방법으로 구분지어 해결했습니다.
  
  3. token 쿠키로 보낼 시 FE에서 받을 수 없는 문제
  header로 token전달 + header로 전달 할 때 cors문제로 app.use(cors({ exposedHeaders: ['accessToken', 'refreshToken'] })); 식으로 header속성을 expose 시켜 해결했습니다.
  
  4. accesstoken을 만료됐는지 확인하여 refreshtoken을 보고 새로 accesstoken만 발급해줘야하는데 refreshtoken도 새로 발급되는 문제
    코드 수정을 통해 refreshtoken은 새로 받지않고 accesstoken만 발급해주는 방식으로 해결했습니다.
