---
title: Avalonia Styles와 ResourceDictionary 완전 정복 (1편)
subtitle: Avalonia UI에서 스타일을 적용하는 두 가지 핵심 개념, Styles와 ResourceDictionary의 차이점과 사용법을 깊이 있게 알아봅니다.
category: technology
tags: ["Avalonia", "AXAML", "Styles", "ResourceDictionary"]
date: '2025-03-06'
---
# Avalonia Styles와 ResourceDictionary 완전 정복 (1편)

Avalonia UI를 사용할 때 스타일을 적용하고 리소스를 관리하는 방법을 깊이 있게 이해하는 것은 매우 중요합니다. 특히 `Styles`와 `ResourceDictionary`는 UI 디자인에서 핵심적인 역할을 합니다. 이번 글에서는 AXAML을 활용하여 `Styles`와 R`esourceDictionary`를 올바르게 사용하는 방법을 설명합니다.

## 1. Styles와 ResourceDictionary의 개념

Avalonia에서 UI를 구성할 때, 스타일을 적용하고 리소스를 관리하는 두 가지 주요 방법이 있습니다: `Styles`와 `ResourceDictionary`입니다. 이 둘은 비슷해 보이지만, 역할과 사용 방식이 다릅니다.

### (1) Styles란?

Styles는 UI 요소의 모양과 동작을 정의하는 스타일 규칙의 모음입니다. 이를 통해 컨트롤의 속성을 변경하고, 일관된 디자인을 유지할 수 있습니다.

**Styles의 주요 특징**

- `Style`, `Setter`, `Selector` 등을 사용하여 UI 컨트롤의 속성을 변경 가능
- 전역(Global) 또는 지역(Local) 스타일로 활용 가능
- `<Styles>` 태그 내부에서 사용하며, 다른 스타일 파일을 불러올 수도 있음 (`<StyleInclude>` 사용)

**✅ Styles 예제**
```xml
<Styles xmlns="https://github.com/avaloniaui">
    <Style Selector="Button">
        <Setter Property="Background" Value="LightBlue"/>
    </Style>
</Styles>
```
위 스타일은 모든 `Button` 컨트롤의 `Background` 색상을 `LightBlue`로 설정합니다.

### (2) ResourceDictionary란?

`ResourceDictionary`는 스타일과는 다르게 앱 전반에서 사용할 리소스(색상, 브러시, 값 등)를 정의하는 저장소 역할을 합니다.

**ResourceDictionary의 주요 특징**

- 키-값 형태로 리소스를 저장하고, `StaticResource` 또는 `DynamicResource`로 참조 가능
- `<ResourceDictionary>` 태그 내부에서 리소스를 정의하며, 다른 ResourceDictionary를 병합할 수도 있음 (`MergedDictionaries` 활용)

**✅ ResourceDictionary 예제**
```xml
<ResourceDictionary xmlns="https://github.com/avaloniaui">
    <SolidColorBrush x:Key="PrimaryColor" Color="#3498db"/>
</ResourceDictionary>
```
위 리소스 딕셔너리는 PrimaryColor라는 키로 파란색 브러시를 정의합니다.

---
### 2. Styles와 ResourceDictionary의 차이점


|비교 항목|Styles|ResourceDictionary|
| :--- |:---:|:---:|
|역할|UI 컨트롤의 스타일 지정|앱 전반에서 재사용 가능한 리소스 저장|
|적용 대상|특정 컨트롤 또는 전체 UI|색상, 브러시, 글꼴, 문자열, 스타일 등|
|정의 방법|<Styles> 태그 내부|<ResourceDictionary> 태그 내부|
|참조 방식|StyleInclude로 불러오기|MergedDictionaries로 병합 가능|
|예제 사용법|Selector와 Setter 사용|x:Key를 사용하여 값 저장|


### 3. Styles와 ResourceDictionary 언제 사용할까?

|상황 |Styles 사용|ResourceDictionary 사용|
|:---|:---|:---|
|모든 버튼을 같은 스타일로 설정|✅|❌|
|전역적으로 동일한 색상을 적용|❌|✅|
|특정 컨트롤만 스타일 적용|✅|❌|
|다크 모드와 라이트 모드 색상 변경|❌|✅|

➡ **결론**: 스타일을 적용할 때는 Styles, 색상 및 리소스를 관리할 때는 ResourceDictionary를 사용하면 된다!

---
### 4. 정리

1. `Styles`는 UI 컨트롤의 스타일을 적용하는 용도로 사용한다.
2. `ResourceDictionary`는 앱 전체에서 공유할 리소스를 저장하는 용도로 사용한다.
3. 스타일과 리소스는 `Application.Resources`에서 함께 관리할 수도 있다.

---
**다음 편(2편) 예고 🔥**

**Styles의 올바른 사용법과 적용 방법**에서 Styles를 더 깊이 있게 다뤄보겠습니다!
- `Style`, `Setter`, `Selector`의 올바른 사용법
- `Application.Resources`에서 Styles 불러오기
- `<StyleInclude>`로 스타일을 모듈화하는 방법

**📌 2편도 기대해주세요! 😊**