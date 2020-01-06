# cgf-leapmotion-pd

## Environment

MacOS 10.13.6

pd 0.49.1-i386

node v12.13.0 (comes with npm 6.12.0)


## Installation

0. 필요한 프로그램을 설치합니다.

    - Leap Motion SDK V2 for Mac: https://developer.leapmotion.com/setup/desktop

    - Node v12.13.0 이상 : https://nodejs.org/ko/download/releases/ 또는 https://nodejs.org/ko/download/

1. `Download ZIP` 또는 `git clone`을 통해 다운받습니다.

2. ZIP 파일의 압축을 해제합니다.

3. 터미널을 켠 후, 압축을 해제한 해당 폴더의 경로로 들어갑니다.

    - 에) 다운로드 폴더에 있을 경우 `cd ~/Downloads/cgf-leapmotion-pd`

4. `node/` 폴더 내에서 `npm install` 명령어를 입력합니다.


## Operation

1. Finder에서 소스 폴더의 경로로 들어갑니다.

2. `pd` 폴더에서 `node-osc-pd-02.pd` 또는 `node-osc-pd-03-processed.pd` 를 켭니다.

    - `node-osc-pd-02.pd` 와 `node-osc-pd-03-processed.pd` 는 손가락 서보의 파라미터를 조정하는 방법이 다릅니다.

3. 터미널을 켠 후, 소스 폴더의 경로로 들어갑니다.

4. `node/` 폴더 내에서 다음 명령어를 입력합니다.

    - `node-osc-pd-02.pd` 실행시
        
        `node main.js`

    - `node-osc-pd-03-processed.pd` 실행시

        `node main-processed.js`


## Contact

김건호

gh.leokim@gmail.com