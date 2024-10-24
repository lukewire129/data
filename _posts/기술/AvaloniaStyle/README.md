---
title: Avalonia UI AXAML 스타일링(깊은 디자인과 얕은 디자인의 이해)
subtitle: Avalonia UI**에서 사용되는 AXAML 마크업 언어를 활용한 스타일링 방식을 소개하려고 합니다. AXAML은 XAML에서 확장된 형태로, HTML과 CSS와 매우 유사한 스타일링 방식입니다.
category: technology
tags: ["Avalonia", "AXAML"]
date: '2024-09-11'
---

![alt text](brand.png)

안녕하세요. 개발자 **이광석**입니다.

이번 글에서는 **Avalonia UI**에서 사용되는 **AXAML ** 마크업 언어를 활용한 스타일링 방식을 소개하려고 합니다. AXAML은 **XAML**에서 확장된 형태로, **HTML**과 **CSS**와 매우 유사한 스타일링 방식입니다.

Avalonia에서 스타일링을 할 때는 **Resources 태그**와 **Styles 태그**가 존재합니다. `Resources` 태그에서는 테마나 색상 같은 공통 자원을 선언하고, `Styles` 태그에서는 컨트롤의 스타일을 지정합니다. 기본적인 스타일링 방식은 다음과 같습니다:
```AXAML
<Setter Property="속성" value="값"/>
```

### 스타일링의 깊이: 얕은 스타일링 vs 깊은 스타일링
스타일링 방식은 크게 **얕은 디자인 스타일**링과 **깊은 디자인 스타일링**으로 나뉩니다.

- **얕은 디자인 스타일링**: 컨트롤의 속성값을 변경하여 외형을 변경하는 방식입니다.
- **깊은 디자인 스타일링**: 컨트롤의 **Template** 속성을 사용하여, 컨트롤의 구조를 완전히 다시 정의하는 방식입니다.

**참고**: 얕은 디자인 스타일링에서도 Template 속성을 사용하면 깊은 디자인 스타일을 적용할 수 있습니다




---
## 테마(Theme) Template 스타일링

**Template** 속성은 기존 컨트롤의 본래 모습을 초기화하고, 새롭게 그릴 수 있는 강력한 스타일링 방법입니다. 이 방식은 WPF의 **ControlTemplate**과 **Style**이 합쳐진 개념이며, 테마로 선언될 수 있습니다. Avalonia에서는 `Resources` 태그 안에 선언하는 것이 특징입니다.

**코드 예시:**
```AXAML
 <Application.Resources>
    <ControlTheme x:Key="EllipseButton" TargetType="Button">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
    </ControlTheme>
  </Application.Resources>
  .
  .
  .
  <Button Theme="{StaticResource EllipseButton}"/>
 // 출처 : https://docs.avaloniaui.net/docs/basics/user-interface/styling/control-themes
```
**설명**: 위 코드는 `Button` 컨트롤의 기본 스타일을 완전히 새로 정의하여, 버튼을 타원형으로 그리고 내부 콘텐츠는 `ContentPresenter`를 통해 표시합니다.

---
## Style을 통한 Template 스타일링
테마 스타일링과 다르게, **Style**은 키가 존재하지 않고 `Styles` 태그 안에 선언됩니다. 컨트롤에 대해 전역적으로 스타일을 적용할 때 유용합니다.

**코드 예시:**
```AXAML
<Application.Styles>
    <Style Selector="Button#EllipseButton">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
    </Style>
  </Application.Styles>
  .
  .
  .
  <Button x:Name="EllipseButton"/>
```
또는 `Classes` 속성을 사용하여 스타일링할 수도 있습니다.
```AXAML
 <Application.Styles>
    <Style Selector="Button.EllipseButton">
      <Setter Property="Background" Value="Blue"/>
      <Setter Property="Foreground" Value="Yellow"/>
      <Setter Property="Padding" Value="8"/>
      <Setter Property="Template">
        <ControlTemplate>
          <Panel>
            <Ellipse Fill="{TemplateBinding Background}"
                     HorizontalAlignment="Stretch"
                     VerticalAlignment="Stretch"/>
            <ContentPresenter x:Name="PART_ContentPresenter"
                              Content="{TemplateBinding Content}"
                              Margin="{TemplateBinding Padding}"/>
          </Panel>
        </ControlTemplate>
      </Setter>
    </Style>
  </Application.Styles>
  .
  .
  .
  <Button Classes="EllipseButton"/>
```
**설명**: 위 두 코드에서 `#`와 `.`의 차이는 각각 `x:Name`과 `Classes`를 이용한 스타일링입니다. 이는 HTML과 CSS에서의 ID와 클래스 선택자와 유사합니다. [참고](https://coding23213.tistory.com/15)

---
## Classes 스타일링
`Classes`를 사용한 스타일링은 **HTML**의 **class**를 연상시키며, 컨트롤의 여러 속성을 재사용할 수 있습니다. Avalonia에서는 `Styles` 태그 안에 선언되며, CSS와 유사하게 여러 클래스를 적용하여 컨트롤의 스타일을 세밀하게 조정할 수 있습니다.

**코드 예시:**
```AXAML
<Style Selector="TextBlock.h1">
 	<Setter Property="FontSize" Value="24"/>
</Style>
<Style Selector="TextBlock.h2">
 	<Setter Property="FontWeight" Value="Bold"/>
</Style>
.
.
.
<TextBlock Classes="h1 h2"/>
```
**설명**: `h1`과 `h2` 클래스를 동시에 적용하여, 텍스트의 크기와 굵기를 모두 설정할 수 있습니다. 이는 HTML의 class 속성을 사용하는 방식과 유사합니다.

---

## 컨트롤 선택자 스타일링
Avalonia에서는 **컨트롤 선택자를 이용한 스타일링**이 가능합니다. HTML의 **ID 선택자**와 유사하며, 특정 컨트롤에만 스타일을 적용할 수 있습니다.

**코드 예시:**

```AXAML
<Style Selector="TextBlock#h1">
 	<Setter Property="FontSize" Value="24"/>
</Style>
.
.
.
<TextBlock x:Name="h1"/>
```
**설명**: `#h1` 선택자는 `x:Name`이 `h1`인 컨트롤에만 스타일을 적용합니다. WPF에서는 지원되지 않는 방식이지만, Avalonia에서는 가능하여 스타일링의 유연성이 더 높습니다.

---
<br/>

## 결론
Avalonia UI의 스타일링은 WPF와 유사하면서도, HTML/CSS 스타일링 방식과도 닮아있습니다. `Template`을 사용한 깊은 스타일링부터, 얕은 디자인을 통해 간편하게 속성만 변경하는 스타일링까지, 다양한 방법을 적절히 사용하여 더욱 유연한 UI를 구현할 수 있습니다.