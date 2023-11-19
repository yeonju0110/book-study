# 🎁 TSConfig 파일

- 모든 파일 이름과 구성 옵션을 항상 `tsc`에 제공하는 대신, 대부분의 구성 옵션을 디렉터리의 `tsconfig.json` 파일에 구체적으로 명시할 수 있음
- `tsconfig.json`의 존재는 해당 디렉터리가 타입스크립트 프로젝트의 루트임을 나타냄
- 디렉터리에서 `tsc`를 실행하면 해당 `tsconfig.json` 파일의 모든 구성 옵션을 읽음

```bash
tsc -p path/to/tsconfig.json
```

- `tsconfig.json` 파일이 있는 디렉터리 경로 또는 `tsc`가 `tsconfig.json` 대신 사용할 파일 경로를 `-p` 또는 `--project` 플래그에 전달

## 1. tsc --init

- `tsconfig.json` 파일을 생성하기 위한 명령어

## 2. CLI vs. 구성

- `tsc --init`에 따라 생성된 TSConfig 파일을 살펴보면 해당 파일의 구성 옵션이 "compiler Options" 객체 내에 있음
- `CLI`와 `TSConfig` 파일에서 사용 가능한 대부분의 옵션은 다음 두 가지 범주 중 하나로 분류됨

  - 컴파일러: 포함된 각 파일이 타입스크립트에 따라 컴파일되거나 타입을 확인하는 방법
  - 파일: 타입스크립트가 실행될 파일과 실행되지 않은 파일

- TODO 두 가지 범주 이후에 이야기 할 프로젝트 레퍼런스와 같은 다른 설정은 `TSConfig` 파일에서만 사용할 수 있음

#### 💡 Tip

- CI 또는 프로덕션 빌드를 위한 일회성 변경과 같은 설정이 `tsc CLI`에 제공되는 경우, `TSConfig` 파일에 명시된 모든 값을 재정의함
- IDE는 일반적으로 타입스크립트 설정 디렉터리의 `tsconfig.json`에서 읽기 때문에 대부분의 구성 옵션을 `tsconfig.json`파일에 넣는 것이 좋음
