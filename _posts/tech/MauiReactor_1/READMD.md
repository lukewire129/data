---
title: MauiReactor 시작하기
subtitle: MauiReactor의 시작하려는 이유
category: technology
tags: ["MVU", "maui","MauiReactor", "크로스플랫폼"]
date: '2024-05-10'
---
# MauiReactor 시작하기

안녕하세요, 이광석입니다.

최근 **MauiReactor**를 공부하며, 이 도구를 배우려는 이유와 기대하는 효과에 대해 간단히 정리해보았습니다. **MVU 패턴**을 채택한 MauiReactor는 전통적인 MVVM 패턴과 다른 방식으로 UI를 개발하게 해주는데, 그 장점들이 명확하게 느껴졌습니다. 아래는 제가 MauiReactor를 배우고 싶은 이유 세 가지를 소개하며, 관심 있는 분들에게 도움이 되었으면 합니다.


### MauiReactor를 배우고 싶은 이유 첫 번째 - 파일 생산 대비 효율적인 결과물
기존의 **MVVM 패턴** 프로젝트에서는 화면을 구성하기 위해 View와 ViewModel이 따로 필요하고, 이를 위한 파일들이 화면마다 쌍으로 생성됩니다. 개발 과정에서 이러한 **보일러플레이트 코드**가 누적되면, 코드 유지 관리와 파일 구조가 복잡해지기 쉽습니다. 반면, MauiReactor는 **MVU 패턴**을 통해 모델 중심으로 UI를 그려내기 때문에 코드 작성량이 상대적으로 적으면서도 **더 직관적인 결과물**을 제공합니다. 결과적으로, 파일 수는 줄어들고, 개발 속도와 생산성은 높아지게 됩니다.
  

### MauiReactor를 배우고 싶은 이유 두 번째 - 런타임 핫 리로드 기능
MauiReactor는 XAML 없이 코드 비하인드로 UI를 선언형으로 작성할 수 있게 해줍니다. 이 방식의 장점은 **런타임에서 즉각적인 핫 리로드**를 통해 UI의 변화와 결과물을 바로 확인할 수 있다는 것입니다. 변화가 있을 때마다 빌드하고 새로고침하는 번거로움이 줄어들어, **빠른 피드백을 바탕으로 개발을 더 유연하고 신속하게 진행**할 수 있습니다. 실시간으로 UI의 상태 변화를 확인하고 조정할 수 있기 때문에, 직관적인 개발이 가능해지고 생산성이 크게 향상됩니다.

### MauiReactor를 배우고 싶은 이유 세 번째 - 다양한 크로스플랫폼 접근성
MauiReactor는 **리액트 네이티브(React Native)**와 **플러터(Flutter)**의 장점을 반영한 기술을 사용하고 있습니다. 이는 단순히 MAUI의 기능을 활용하는 것에 그치지 않고, **다양한 크로스플랫폼 기술의 장점**을 체감할 수 있게 합니다. 이로 인해 여러 플랫폼에 대한 간접 경험을 쌓을 수 있어, Xamarin, WPF, Avalonia 등 다른 플랫폼으로 확장해보고 싶은 분들에게도 유용할 것입니다. 다양한 기술 스택을 경험하며 크로스플랫폼 개발에 대한 인사이트를 얻고자 하는 분들께 MauiReactor는 좋은 선택이 될 수 있습니다.

---

### Repository 및 Sample 코드
MauiReactor는 **리액트 네이티브(React Native)**와 **플러터(Flutter)**의 장점을 반영한 기술을 사용하고 있습니다. 이는 단순히 MAUI의 기능을 활용하는 것에 그치지 않고, 다양한 크로스플랫폼 기술의 장점을 체감할 수 있게 합니다. 이로 인해 여러 플랫폼에 대한 간접 경험을 쌓을 수 있어, Xamarin, WPF, Avalonia 등 다른 플랫폼으로 확장해보고 싶은 분들에게도 유용할 것입니다. 다양한 기술 스택을 경험하며 크로스플랫폼 개발에 대한 인사이트를 얻고자 하는 분들께 MauiReactor는 좋은 선택이 될 수 있습니다.

- MauiReactor Repository : [Link](https://github.com/adospace/reactorui-maui)
- MauiReactor Sample 
  - SQLite와 MauiReactor 연동 예제: [Link](https://github.com/lukewire129/SqliteExample-ReactorMaui)
  - 호갱노노 로그인페이지 예제: [Link](https://github.com/lukewire129/HogangNoNo_Toy_ReactorMaui)

  
