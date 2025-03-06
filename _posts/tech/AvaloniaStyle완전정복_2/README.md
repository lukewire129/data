---
title: Avalonia Styles 실전 활용 (2편)
subtitle: Avalonia UI의 Styles를 더 깊이 있게 활용하는 방법을 소개합니다. 다양한 Selector와 모듈화된 스타일 적용법을 다룹니다.
category: technology
tags: ["Avalonia", "AXAML", "Styles", "Selector"]
date: '2025-03-07'
---
# Avalonia Styles 실전 활용 (2편)

[1편](https://lukewire129.github.io/blog/postdetail?category=tech&title=AvaloniaStyle%EC%99%84%EC%A0%84%EC%A0%95%EB%B3%B5_1&name=README.md)에서는 `Styles`와 `ResourceDictionary`의 차이점을 살펴보았습니다. 이번 2편에서는 `Styles`를 더욱 효과적으로 활용하는 방법을 알아봅니다. 특히 `Selector`를 활용하여 특정 컨트롤이나 상태에 맞는 스타일을 적용하는 방법을 중점적으로 다룹니다.

### 1. 스타일 지정 방식

`Styles`를 사용할 때는 다양한 방식으로 특정 컨트롤에 스타일을 적용할 수 있습니다. 대표적인 방식은 다음과 같습니다.

**(1) 기본 셀렉터를 활용한 스타일 지정**
```xml
<Styles xmlns="https://github.com/avaloniaui">
    <Style Selector="Button">
        <Setter Property="Background" Value="LightBlue"/>
    </Style>
</Styles>
```

위 스타일은 모든 `Button` 컨트롤에 `LightBlue` 배경색을 적용합니다.

**(2) 특정 클래스(Class)를 활용한 스타일 지정**

`Classes` 속성을 사용하여 특정한 컨트롤에만 스타일을 적용할 수 있습니다.

**✅ 클래스 기반 스타일 적용 예제**
```xml
<Styles xmlns="https://github.com/avaloniaui">
    <Style Selector="Button.myButton">
        <Setter Property="Background" Value="Green"/>
    </Style>
</Styles>

<Button Classes="myButton" Content="클래스 스타일 적용"/>
```

위와 같이 `Classes="myButton"`을 지정하면 해당 버튼에만 스타일이 적용됩니다.

**(3) 특정 ID(Name) 기반 스타일 지정**

`x:Name`을 이용하여 특정 컨트롤에 스타일을 적용할 수도 있습니다.

**✅ ID 기반 스타일 적용 예제**
```xml
<Styles xmlns="https://github.com/avaloniaui">
    <Style Selector="Button#A">
        <Setter Property="Background" Value="Red"/>
    </Style>
</Styles>

<Button x:Name="A" Content="ID 스타일 적용"/>
```

위 코드에서는 `x:Name="A"`를 가진 버튼만 스타일이 적용됩니다.

**(4) 특정 상태(Pseudo-Class) 적용**

마우스 오버 상태 또는 클릭 상태 등 특정 상태에서 스타일을 변경할 수도 있습니다.

**✅ 마우스 오버 상태(Hover) 스타일 적용 예제**
```xml
<Styles xmlns="https://github.com/avaloniaui">
    <Style Selector="Button:hover">
        <Setter Property="Background" Value="DarkBlue"/>
    </Style>
</Styles>
```
위 코드는 버튼에 마우스를 올렸을 때(`hover` 상태) 배경색을 `DarkBlue`로 변경합니다.

### 2. 스타일 모듈화 (StyleInclude 활용)

스타일을 별도의 파일로 분리하여 재사용할 수도 있습니다.

**✅ StyleInclude를 활용한 스타일 분리**
```xml
<Styles xmlns="https://github.com/avaloniaui">
    <StyleInclude Source="avares://MyApp/Styles/ButtonStyles.axaml"/>
</Styles>
```
위처럼 `StyleInclude`를 사용하면 `ButtonStyles.axaml` 파일에서 스타일을 불러와 적용할 수 있습니다.

**✅ ButtonStyles.axaml 예제**
```xml
<Styles xmlns="https://github.com/avaloniaui">
    <Style Selector="Button.primary">
        <Setter Property="Background" Value="#007bff"/>
        <Setter Property="Foreground" Value="White"/>
    </Style>
</Styles>
```
이제 `Classes="primary"`를 가진 버튼은 자동으로 해당 스타일을 적용받습니다.

### 3. 정리
- `Styles`는 기본 셀렉터, 클래스 기반, ID 기반, 상태 기반 등 다양한 방식으로 적용할 수 있다.
- `Classes` 속성을 활용하면 특정 컨트롤에만 스타일을 적용할 수 있다.
- `x:Name`을 활용하여 특정 컨트롤에만 스타일을 지정할 수도 있다.
- `hover`와 같은 상태(`Pseudo-Class`)를 사용하여 동적인 스타일 변경이 가능하다.
- `StyleInclude`를 활용하면 스타일을 분리하여 관리할 수 있다.

---
### 다음 편(3편) 예고 🔥

**ResourceDictionary의 고급 활용법**에서는 `MergedDictionaries`, `DynamicResource` 등을 활용한 리소스 관리 기법을 소개합니다!

**📌 3편도 기대해주세요! 😊**