---
title: MauiReactor의 Stateless과 Statefull
subtitle: StaelessComponent와 StatefullComponent에 대해 알아보기
category: technology
tags: ["MVU", "maui","MauiReactor", "크로스플랫폼"]
date: '2023-05-13'
---
# MauiReactor의 Stateless과 Statefull
안녕하세요, 이광석입니다.

`MauiReactor`는 Maui 컨트롤 기반으로 Reactive Native, Flutter, SwiftUI 같은 프레임워크에서 일부 기술들을 차용했기 때문에, 이들 프레임워크를 한두 번 경험해본 적이 있다면 쉽게 이해할 수 있습니다.

(실제로 이 블로그 글을 작성하면서 위의 프레임워크들의 샘플 프로젝트들을 살펴보았는데, 유사해 보이는 부분이 존재하기도 했습니다.)

MauiReactor의 State-less Components와 Statefull Components는 Flutter 프레임워크의 StatelessWidget(SLW)와 StateFullWidget(SFW)을 차용하여 만들어진 개념이라고 보시면 됩니다.

Flutter의 SLW와 SFW의 차이점에 대해서는 이 링크(https://security-nanglam.tistory.com/478)를 참고하세요.

### State-less Components (정적 컴포넌트)

`State-less Components`는 상태를 가지지 않는 컴포넌트로, 사용자가 직접 상태를 관리할 필요가 없는 단순한 UI 요소를 구현할 때 사용됩니다. 이는 UI가 외부의 입력이나 내부 상태에 따라 변경되지 않는 경우 유용합니다. 예를 들어, 정적인 텍스트나 이미지를 표시할 때 사용될 수 있습니다.

State-less Components의 주요 특징은 다음과 같습니다:

상태를 가지지 않으므로, 업데이트나 리렌더링 시 간단하게 처리됩니다.

성능 최적화가 쉽습니다. 왜냐하면 상태 변화에 따라 불필요한 리렌더링이 발생하지 않기 때문입니다.

데이터의 변동이 없는 고정된 UI 요소를 표현할 때 적합합니다.

MauiReactor에서 State-less Component는 VisualElement를 상속받아 정의됩니다. 이는 Flutter의 StatelessWidget과 유사한 구조로, 사용자는 간단한 UI를 정의하고 상태 관리에 대해 신경 쓸 필요가 없습니다.

예시 코드:
```
public class MyStatelessComponent : Component
{
    public override VisualNode Render() => new Text("Hello, World!");
}
```
이 예시는 단순히 "Hello, World!"라는 텍스트를 렌더링하는 컴포넌트를 정의한 것입니다.

### Statefull Components (동적 컴포넌트)

`Statefull Components`는 내부에 상태를 가지는 컴포넌트로, UI가 사용자의 상호작용에 따라 변경되어야 할 때 사용됩니다. 예를 들어, 버튼을 눌렀을 때 텍스트가 바뀌는 경우와 같이 UI에 동적 변화가 필요한 상황에서 활용됩니다.

Statefull Components의 주요 특징은 다음과 같습니다:

내부에 상태를 가지며, 상태가 변경될 때마다 UI가 자동으로 업데이트됩니다.

복잡한 UI 상호작용을 처리할 수 있으며, 사용자와의 인터렉션에 따른 변화를 손쉽게 관리할 수 있습니다.

상태를 가진다는 점에서, 사용자는 상태 변화와 이에 따른 UI 업데이트 로직을 정의해야 합니다.

MauiReactor에서 Statefull Component는 Component를 상속받아 정의되며, State 객체를 사용하여 상태를 관리합니다. 이는 Flutter의 StateFullWidget과 매우 유사한 방식입니다.

예시 코드:
```
public class CounterState
{
    public int Count { get; set; }
}

public class CounterComponent : Component<CounterState>
{
    public override VisualNode Render() => new VStack
    {
        new Button("Click me!", () => SetState(s => s.Count++)),
        new Text($"Clicked {State.Count} times")
    };
}
```

위 예시는 CounterState 클래스를 통해 상태를 정의하고, 버튼을 클릭할 때마다 Count 값이 증가하며, 해당 값을 UI에 반영하는 컴포넌트를 정의한 것입니다. SetState() 메소드를 사용하여 상태를 업데이트하고, 상태 변경 시 UI가 자동으로 재렌더링됩니다.

위 예시는 버튼을 클릭할 때마다 _count 값이 증가하며, 해당 값을 UI에 반영하는 컴포넌트를 정의한 것입니다. SetState() 메소드를 사용하여 상태를 업데이트하고, 상태 변경 시 UI가 자동으로 재렌더링됩니다.

이처럼 MauiReactor의 State-less Components와 Statefull Components는 Flutter에서 차용된 개념을 잘 반영하고 있어, Flutter를 경험해 본 개발자라면 빠르게 적응할 수 있을 것입니다.


자세한 사항은 아래 링크를 통해 확

- [State-less Components](https://adospace.gitbook.io/mauireactor/components/state-less-components)

- [Stateful Components](https://adospace.gitbook.io/mauireactor/components/stateful-components)