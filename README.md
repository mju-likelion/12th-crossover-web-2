**12th-crossover-web-2**
**크로스오버 -2조**

팀원 :   
frontEnd : 유민기, 채희림    </br>   
backEnd : 최현서, 김재헌    </br>

**convention**

- Conding Convention
1. 파일(폴더) 네이밍 : camelCase(components, pages 제외)
    
    `exampleFileName;`
    
2. branch 네이밍
    
  <img width="865" alt="스크린샷 2024-06-01 오후 5 26 03" src="https://github.com/mju-likelion/12th-crossover-web-2/assets/108206432/b8cd22e1-c0be-43b7-9184-36387d9fa0c9">

3. CommitType 네이밍
```java
	
Feat : 새로운 기능 추가
Fix : 버그 수정
Docs : 문서 수정
Style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
Refactor : 코드 리펙토링
Test : 테스트(테스트 코드 추가, 수정, 삭제, 비즈니스 로직에 변경이 없는 경우)Chore :
위에 걸리지 않는 기타 변경사항 (빌드 스크립트 수정, assets image, 패키지 매니저 등)Design : CSS 등 사용자 UI 디자인 변경
Comment : 필요한 주석 추가 및 변경
Init : 프로젝트 초기 생성
Rename : 파일 혹은 폴더명 수정하거나 옮기는 경우
Remove : 파일을 삭제하는 작업만 수행하는 경우

```

5. Event Handler 네이밍: ~handler
    
    ```
    const exampleHandler = (): void => {};
    ```
    
6. Handler Function Prop 네이밍: on~
    
    ```
    return <ExampleComponent onSubmit={exampleHandler} />;
    ```
    
7. Interface 네이밍: camelCase +
    - props으로 넘길 때 ~Props
    
    ```
    interface exampleProps {
        name: string;
    }
    ```
    
    - 다른 모든 경우, ~Type
8. styled-components 구조: 최상위 태그에만 한 번
    
    ```
    const StyledTag = styled.div``;
    
    return (
        <StyledTag>
            <div>Not</div>
            <div>There</div>
        </StyledTag>
    );
    ```
    
9. 타입 관리
- 전역적으로 재사용될 타입: `src/@types/index.d.ts`에서 `declare`하여 정리(import, export 필요 없음)
- 단 하나의 컴포넌트에만 쓰이는 타입은 해당 파일 내부에 선언해도 무관
- 타입 선언 방식: interface(대부분의 타입) + type alias(원시 타입)
