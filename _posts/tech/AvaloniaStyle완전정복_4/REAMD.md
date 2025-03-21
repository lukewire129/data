---
title: Avalonia Styles와 ResourceDictionary 함께 사용하기 (4편)

subtitle: Avalonia UI에서 ResourceDictionary와 Styles를 함께 사용하는 방법을 알아봅니다.

category: technology

tags: ["Avalonia", "AXAML", "ResourceDictionary", "Styles"]

date: '2025-03-21'
---

# Avalonia Styles와 ResourceDictionary 함께 사용하기 (4편)

지난 [3편](https://lukewire129.github.io/blog/postdetail?category=tech&title=AvaloniaStyle%EC%99%84%EC%A0%84%EC%A0%95%EB%B3%B5_3&name=README.md)에서는 `ResourceDictionary`를 활용한 리소스 관리와 `MergedDictionaries`를 이용한 스타일 모듈화를 살펴보았습니다. 이번 4편에서는 `Styles`와 `ResourceDictionary`를 함께 사용하는 방법을 다루겠습니다.

### 1. ResourceDictionary에서 Styles를 직접 포함할 수 없는 이유

Avalonia의 `ResourceDictionary`는 브러시, 문자열, 템플릿 등 다양한 리소스를 포함할 수 있지만, `Styles`를 직접 포함하는 것은 지원되지 않습니다. 이는 `Styles`가 `ResourceDictionary`와 다르게 내부적으로 IStyle 인터페이스를 구현하고 있으며, `ResourceDictionary`의 단순 키-값 저장 방식과 호환되지 않기 때문입니다.

**❌ 잘못된 예제** (이렇게 하면 안 됩니다)
```xml
<ResourceDictionary xmlns="https://github.com/avaloniaui">
    <Style Selector="Button">
        <Setter Property="Background" Value="Blue"/>
    </Style>
</ResourceDictionary>
```
위 코드는 ResourceDictionary 내부에서 Styles를 직접 정의하려고 하기 때문에 오류가 발생합니다.

### 2. Styles에서 ResourceDictionary의 리소스를 사용하는 방법

반대로 `Styles`에서는 `ResourceDictionary`에 정의된 리소스를 정상적으로 가져와서 사용할 수 있습니다.

**✅ 올바른 예제** (Styles 내부에서 ResourceDictionary 사용)
```xml
<ResourceDictionary xmlns="https://github.com/avaloniaui">
    <SolidColorBrush x:Key="PrimaryColor" Color="#007bff"/>
</ResourceDictionary>

<Styles xmlns="https://github.com/avaloniaui">
    <Style Selector="Button">
        <Setter Property="Background" Value="{StaticResource PrimaryColor}"/>
    </Style>
</Styles>
```
위 코드에서 `PrimaryColor`는 `ResourceDictionary`에 정의되어 있으며, `Styles` 내부에서 `StaticResource`를 통해 이를 참조할 수 있습니다.

### 3. App.axaml에서 ResourceDictionary와 Styles를 함께 적용하는 방법

애플리케이션 전역에서 `ResourceDictionary`와 `Styles`를 함께 사용하려면 `App.axaml`에서 이를 병합하여 등록하면 됩니다.

**✅ 올바른 설정 방법**
```xml
<Application xmlns="https://github.com/avaloniaui"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Application.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceInclude Source="avares://MyApp/Styles/Colors.axaml"/>
                <ResourceInclude Source="avares://MyApp/Styles/Buttons.axaml"/>
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
        <Styles>
            <Style Selector="Button">
                <Setter Property="Background" Value="{StaticResource PrimaryColor}"/>
            </Style>
        </Styles>
    </Application.Resources>
</Application>
```
위 방식으로 설정하면 `ResourceDictionary`에 정의된 `PrimaryColor`를 `Styles`에서 문제없이 사용할 수 있습니다.

### 4. 정리

- `ResourceDictionary`는 `Styles`를 직접 포함할 수 없다.
- `Styles`는 `ResourceDictionary`의 리소스를 `StaticResource` 또는 `DynamicResource`를 통해 활용할 수 있다.
- `App.axaml`에서 `ResourceDictionary`와 `Styles`를 함께 정의하면 애플리케이션 전역에서 일관된 스타일을 유지할 수 있다.

이로써 Avalonia UI 스타일링 시리즈를 마무리합니다! 🎉
앞으로 Avalonia UI를 활용한 개발에서 더욱 효율적으로 스타일을 관리하시길 바랍니다! 😊