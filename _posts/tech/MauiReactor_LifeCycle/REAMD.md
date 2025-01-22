---
title: MauiReactor의 LifeCycle
subtitle: MauiReactor의 컴포넌트 상태주기에 대해 알아보기
category: technology
tags: ["MVU", "maui","MauiReactor", "크로스플랫폼"]
date: '2024-05-15'
---
# MauiReactor의 LifeCycle
안녕하세요 이광석입니다.

MauiReactor의 컴포넌트는 특정 상태 주기를 따르며, 이는 컴포넌트가 생성되고 소멸될 때까지의 일련의 과정을 관리하는 데 도움을 줍니다. MauiReactor의 컴포넌트 상태 주기는 React와 유사한 패턴을 따르며, 다음과 같은 단계로 구성됩니다:

1. **Mounted (생성)**

   - 컴포넌트가 처음 생성되어 화면에 렌더링되는 단계입니다. 이 시점에서 초기 상태를 설정하거나 필요한 리소스를 로드할 수 있습니다.

   예시 코드:
   ```csharp
   public class MyComponent : Component
   {
       protected override void OnMounted()
       {
           base.OnMounted();
           Console.WriteLine("컴포넌트가 생성되었습니다.");
           // 초기 상태 설정 또는 리소스 로드
       }
   }
   ```

2. **PropsChanged (속성 변경)**

   - 컴포넌트의 속성(Props)이 변경될 때 호출됩니다. 이 단계에서는 외부에서 전달된 데이터가 변경될 때 상태를 업데이트하거나, 필요한 경우 리렌더링 작업을 수행할 수 있습니다.

   예시 코드:
   ```csharp
   public class MyComponent : Component
   {
       [Parameter] public string Title { get; set; }

       protected override void OnPropsChanged()
       {
           base.OnPropsChanged();
           Console.WriteLine($"속성이 변경되었습니다: {Title}");
           // 필요한 경우 상태 업데이트 수행
       }
   }
   ```

3. **WillUnmount (제거 전)**

   - 컴포넌트가 화면에서 제거되기 전에 호출되는 단계입니다. 이 단계에서는 구독하고 있던 이벤트나 리소스를 해제하여 메모리 누수를 방지할 수 있습니다.

   예시 코드:
   ```csharp
   public class MyComponent : Component
   {
       protected override void OnWillUnmount()
       {
           base.OnWillUnmount();
           Console.WriteLine("컴포넌트가 제거되기 전입니다.");
           // 이벤트 구독 해제 또는 리소스 해제
       }
   }
   ```

이러한 상태 주기를 통해 개발자는 컴포넌트가 언제 생성되고 언제 업데이트되며 언제 제거되는지 명확히 파악할 수 있으며, 각 단계에서 필요한 작업을 수행하여 효율적으로 상태와 리소스를 관리할 수 있습니다.

예를 들어, 데이터베이스 연결을 생성하고 닫거나, 이벤트 핸들러를 등록하고 해제하는 작업은 이러한 상태 주기를 통해 적절하게 관리될 수 있습니다.

MauiReactor의 컴포넌트 상태 주기는 UI의 일관성과 성능 최적화를 위해 매우 중요한 역할을 하며, 이를 통해 사용자에게 부드럽고 반응성 좋은 UI 경험을 제공할 수 있습니다.

