# 냄궁밈수 (밈 생성기)

<img width="600" alt="image" src="https://user-images.githubusercontent.com/67448481/156365678-5cbd80e9-2a1a-49b6-9ec0-35c380bbc870.png">

## 프로젝트 개요

> 원하는 사진을 고른 뒤, 센스 있는 문구를 넣어 자신만의 재밌는 밈을 생성해보세요 :)

---

## 배포 주소

### [https://namgoong-meme-soo.vercel.app/](https://namgoong-meme-soo.vercel.app/)

---

## Stacks

[![TS](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=black)](github.com/hoonjoo-park/Type-Todo)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=ffffff)](github.com/hoonjoo-park/pipi)
[![Next](https://img.shields.io/badge/Next.js-d1d1d1?style=flat-square&logo=Next.js&logoColor=000000)](github.com/hoonjoo-park/pipi)
[![SC](https://img.shields.io/badge/Styled%20Components-DB7093?style=flat-square&logo=styled-components&logoColor=ffffff)](github.com/hoonjoo-park/pipi)

---

## 실행 방법

```bash
$ npm run dev
```

---

## 주요 기능

1. **밈 텍스트 박스 이동 기능**
2. **밈 텍스트 박스 리사이징 기능**
3. **밈 텍스트 박스 리사이징 시 폰트 사이즈 동적 변경 기능**
4. **컬러 팔레트를 통한 텍스트별 폰트 컬러 지정 기능**
5. **이미지 드래그&드롭 업로드 기능**
6. **DOM To Image, 로컬 저장 기능**

---

### 텍스트 박스`<div>` 이동 기능

> 기본적으로 `onMouseDown`, `onMouseMove`, `onMouseUp` 이벤트를 활용하여 구현했습니다.

1. `onMouseDown`

   텍스트 박스에 mouseDown이 됐을 때 첫 마우스의 X,Y좌표, 그리고 offsetLeft,offsetTop 값을 state에 저장합니다.

   ```typescript
   const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
     e.preventDefault();
     e.stopPropagation();
     setIsDown(true);
     setStartX(e.pageX);
     setStartY(e.pageY);
     setStartTop(e.currentTarget.offsetTop);
     setStartLeft(e.currentTarget.offsetLeft);
   };
   ```

2. `onMouseMove`

   `<div>` 엘리먼트가 움직여야 할 거리를 `event.pageX || Y`를 통해 계산합니다.

   ```typescript
   const handleMouseMove = (e: MouseEvent) => {
     // mouseDown이 되지 않았다면 해당 함수 실행을 블락합니다.
     if (!isDown || isResizing) return;
     e.preventDefault();
     e.stopPropagation();
     const toMoveTop = e.pageY - startY + startTop;
     const toMoveLeft = e.pageX - startX + startLeft;
     // 이미지 박스 밖으로 텍스트가 빠져나가지 못하도록 판별해주는 조건식입니다.
     const moveOptions =
       toMoveTop + 10 <= 0 ||
       toMoveTop + inputRef.current!.offsetHeight - 10 >=
         textBoundary!.bottom ||
       toMoveLeft - inputRef.current!.offsetWidth / 2 + 10 <= 0 ||
       toMoveLeft + inputRef.current!.offsetWidth / 2 - 10 >=
         textBoundary!.right;
     if (moveOptions) return;
     textMover(toMoveTop, toMoveLeft);
   };
   ```

3. `onMouseUp`

   마우스를 떼면, 위의 두 이벤트 핸들링이 종료됩니다.

   ```typescript
   const handleStopMoving = () => {
     setIsDown(false);
     window.removeEventListener('mousemove', handleMouseMove);
     window.removeEventListener('touchmove', handleTouchMove);
     window.removeEventListener('mouseup', handleStopMoving);
     window.removeEventListener('touchend', handleStopMoving);
   };
   ```

---

### 밈 텍스트 박스 리사이징 기능

<img width="300" alt="image" src="https://user-images.githubusercontent.com/67448481/156370599-26c8395f-7781-4562-b16d-5d86c5199649.png">

> 위의 엘리먼트 드래깅 이동 기능과 구현 로직이 조금 유사합니다.

1. `onMouseDown`

   리사이징 엘리먼트 위에서 mouseDown이 일어났을 때 리사이징을 시작하고, 엘리먼트의 드래깅 이동 기능을 잠시 차단합니다.

   ```typescript
   const resizeStart = (e: React.MouseEvent, type: string) => {
     setResizer(type);
     setIsResizing(true);
     // 위와 비슷하게 마우스의 초기 X,Y 좌표와 초기 width,height값을 저장합니다.
     setResizeStartX(e.clientX);
     setResizeStartY(e.clientY);
     const inputStyle = getComputedStyle(inputRef.current!);
     const inputWidth = parseFloat(inputStyle.width);
     const inputHeight = parseFloat(inputStyle.height);
     setStartWidth(inputWidth);
     setStartHeight(inputHeight);
   };
   ```

2. `onMouseMove`

   mouseDown이 되면 isResizing이 true가 되고, window 전역에 mouseMove 이벤트리스닝에 따른 핸들러 함수가 실행됩니다.

   ```typescript
   const mouseResizing = (e: MouseEvent) => {
     // 우선 마우스가 움직인 거리만큼 엘리먼트의 사이즈가 줄어들거나, 늘어나야 하기 때문에
     // 아래와 같이 마우스의 이동 거리를 계산해줍니다.
     const movedX = resizeStartX - e.clientX;
     const movedY = resizeStartY - e.clientY;
     handleFontSize();
     if (movedX === 0) return;
     handleResize(movedX, movedY);
   };
   ```

   ```typescript
   const handleResize = (movedX: number, movedY: number) => {
     switch (resizer) {
       // 선택된 리사이저가 무엇이느냐에 따라 조정되어야 할 엘리먼트 사이즈 방향성이 달라지기 때문에 switch문을 사용했습니다.
       case 'leftTop':
         inputRef.current!.style.width = `${startWidth + movedX}px`;
         inputRef.current!.style.height = `${startHeight + movedY}px`;
         break;
       //(...생략)
     }
   };
   ```

---
