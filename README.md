<h1 align="center">Welcome to Scroll Hooks π</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> React Hooksλ‘ μ€ν¬λ‘€ μ λλ©μ΄μ κ΅¬ννκΈ°

### β¨ [Demo](https://scroll-hooks.netlify.com/)

![ScreenShot](https://user-images.githubusercontent.com/43605468/71435743-b1e7ee00-272d-11ea-8d91-406039315b5f.png)

## Scroll Hooks

μ€ν¬λ‘€ μ λμνλ Fade In, Count, Clip Path μ λλ©μ΄μμ React Hooksλ‘ κ΅¬ν

<br />

### useScrollFadeIn

![useScrollFadeIn](https://user-images.githubusercontent.com/43605468/74002206-b866b800-49b1-11ea-900e-7ae690036066.gif)

μ€ν¬λ‘€ μ νΉμ  λ°©ν₯μμ Fade In νλ©΄μ λμ€λ μ λλ©μ΄μ

**Usage**

```javascript
const element = useScrollFadeIn([direction], [duration], [delay]);
```

- direction(string): μλ¦¬λ¨ΌνΈκ° λμ€λ λ°©ν₯ (up, down, left, right) `default value = 'up'`
- duration(number): μ λλ©μ΄μμ μ΄ λμ μκ°. second λ¨μ `default value = 1`
- delay(number): μ λλ©μ΄μ μ§μ° μκ°. second λ¨μ `default value = 0`

**Example**

```javascript
const animatedItem = useScrollFadeIn('up', 1, 0);
...

// In JSX
<div {...animatedItem} />
```

<br />

### useScrollCount

![useScrollCount](https://user-images.githubusercontent.com/43605468/74001849-6a04e980-49b0-11ea-9d5f-48ba5a0fcee2.gif)

μ€ν¬λ‘€ μ μ ν΄λμ κ°κΉμ§ μΉ΄μ΄νΈνλ μ λλ©μ΄μ

**Usage**

```javascript
const element = useScrollCount([end], [start], [duration]);
```

- end(number): μΉ΄μ΄νΈκ° λλλ μ«μ
- duration(number): μΉ΄μ΄νΈκ° μμνλ μ«μ `default value = 0`
- duration(number): μ λλ©μ΄μμ μ΄ λμ μκ°. second λ¨μ `default value = 3`

**Example**

```javascript
const animatedItem = useScrollCount(200, 0, 3);
...

// In JSX
<div {...animatedItem} />
```

<br />

### useScrollClipPath

![useScrollClipPath](https://user-images.githubusercontent.com/43605468/74001833-62dddb80-49b0-11ea-82c3-215a3545c320.gif)

μ€ν¬λ‘€ μ νΉμ  λ°©ν₯μΌλ‘ νΌμ³μ§λ μ λλ©μ΄μ

**Usage**

```javascript
const element = useScrollClipPath([direction], [duration], [delay]);
```

- direction(string): μλ¦¬λ¨ΌνΈκ° νΌμ³μ§λ λ°©ν₯ (up, down, left, right) `default value = 'left'`
- duration(number): μ λλ©μ΄μμ μ΄ λμ μκ°. second λ¨μ `default value = 1`
- delay(number): μ λλ©μ΄μ μ§μ° μκ°. second λ¨μ `default value = 0`

**Example**

```javascript
const animatedItem = useScrollClipPath('left', 1, 0);
...

// In JSX
<div {...animatedItem} />
```

<br />

## Install

```sh
yarn
```

## Usage

```sh
yarn start
```

## Author

π€ **Jusung Kim**

- Website: https://jusungkim.kr/
- Github: [@jus0k](https://github.com/jus0k)

## Show your support

Give a β­οΈ if this project helped you!
