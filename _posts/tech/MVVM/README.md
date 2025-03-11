---
title: MVU에 가까운 MVVM – 모델이 곧 뷰가 되는 설계
subtitle: 전통적인 MVVM을 벗어나, UI 로직을 단순화하는 새로운 접근 방식
category: technology
tags: ["MVVM", "MVU", "WPF", "Avalonia", "Uno Platform", "UI Architecture"]
date: '2025-03-11'
---

# MVU에 가까운 MVVM: 뷰모델의 부담을 줄이고 모델이 곧 뷰가 되는 설계
### 들어가며
최근 UI 아키텍처에 대해 고민하면서, 기존의 MVVM 패턴에서 뷰모델이 담당하는 역할이 너무 무겁고, 때로는 불필요하게 복잡하다는 생각을 하게 되었습니다. 그러던 중 "**모델이 곧 뷰다**"라는 관점에 도달하게 되었고, 이를 통해 **MVU(MVI) 스타일의 단순한 데이터 흐름**`**과 결합한 새로운 MVVM 접근법을 시도해보게 되었습니다. 이 글에서는 그 과정을 공유하고, 실제 구현 예제와 함께 장단점을 정리해보겠습니다.

### MVU에 가까운 MVVM이란?
전통적인 MVVM 패턴에서는
- **모델(Model)**: 순수 데이터와 비즈니스 로직을 담당
- **뷰모델(ViewModel)**: 모델의 데이터를 UI에 맞게 가공하고, 커맨드와 이벤트를 관리
- **뷰(View)**: 사용자에게 데이터를 보여주고, 사용자 입력을 받는 역할
하는 식으로 계층이 명확하게 분리됩니다.

그러나 제가 제안하는 방식은 `모델이 곧 뷰 역할`을 겸한다는 점입니다.
즉,

- **컴포넌트 모델(ComponentModel)**: UI에 직접 바인딩되는 데이터와 UI 로직(예: INotifyPropertyChanged)을 포함하여, 사실상 컴포넌트(또는 뷰) 역할까지 수행
- **레이아웃 및 전역 명령을 관리하는 뷰모델(LayoutViewModel)**: 개별 컴포넌트의 데이터 가공보다는 화면 전환, 글로벌 명령(버튼 클릭 등)만을 처리
이런 식으로 구성하면, 개별 UI 단위(컴포넌트)는 **모델 자체에서 관리**되며, 불필요한 중간 계층(전통적인 뷰모델)을 줄일 수 있습니다.

### 폴더 구조 예시
```
UI/
├── Layouts/                        # 레이아웃 및 화면 전환을 관리하는 뷰모델
│   ├── MainLayout.xaml
│   ├── Sidebar.xaml
│   ├── Topbar.xaml
│   └── LayoutViewModel.cs          # 전체 화면 레이아웃 관리
│
├── Components/                     # 개별 UI 구성 요소 (뷰 = 모델)
│   ├── EngineerComponent.xaml
│   ├── DoctorComponent.xaml
│   ├── LawyerComponent.xaml
│   └── ...
│
└── ComponentModels/                # 각 컴포넌트에 대응하는 모델 (실질적으로 뷰모델 역할 포함)
    ├── EngineerModel.cs
    ├── DoctorModel.cs
    ├── LawyerModel.cs
```
### 예제 코드
**1. ComponentModel (예: EngineerModel)**
```csharp
public partial class EngineerModel : ObservableObject
{
    [ObservableProperty]
    private string name;

    [ObservableProperty]
    private int experience;

    // UI에 바로 연결될 수 있는 계산된 속성
    public string DisplayInfo => $"{Name} has {Experience} years of experience.";

    // UI에서 직접 호출하여 데이터 업데이트
    public void Update(string name, int experience)
    {
        Name = name;
        Experience = experience;
        OnPropertyChanged(nameof(DisplayInfo));
    }
}
```

**2. Component (예: EngineerComponent)**
```csharp
public partial class EngineerComponent : UserControl
{
    public EngineerModel Engineer { get; }

    public EngineerComponent()
    {
        InitializeComponent();
        Engineer = new EngineerModel() { Name = "John Doe", Experience = 5 };
        DataContext = Engineer;
    }

    private void UpdateButton_Click(object sender, RoutedEventArgs e)
    {
        Engineer.Update("Jane Doe", 10);
    }
}
```
### 3. LayoutViewModel (화면 전환 및 전역 명령 관리)
```csharp
public partial class LayoutViewModel : ObservableObject
{
    [ObservableProperty]
    private object currentView;

    public ICommand NavigateToEngineer { get; }

    public LayoutViewModel()
    {
        NavigateToEngineer = new RelayCommand(() => CurrentView = new EngineerComponent());
    }
}
```
### 장점과 단점
**장점**
- **단순성**: 뷰모델 계층을 최소화하여, 각 컴포넌트의 데이터와 UI 로직을 한 곳에서 관리할 수 있음
- **직관적인 데이터 흐름**: 모델이 UI에 직접 연결되어 변경 사항이 즉시 반영됨
- **유연성**: MVU 스타일의 단방향 데이터 흐름을 도입하여, 상태 관리를 쉽게 하고, 전체 레이아웃은 별도의 뷰모델에서 관리 가능
- **UI 프레임워크 독립성**: 뷰모델은 전역적인 화면 관리에 집중하므로, 개별 컴포넌트 모델은 다른 프레임워크로 쉽게 이식 가능

### 단점
- **공용 모델 재사용 어려움**: UI에 특화된 컴포넌트 모델은 다른 프로젝트에서 재사용하기 어려울 수 있음
- **유지보수 부담**: UI 변경 시 모델 자체도 수정해야 하므로, 강한 결합으로 인한 유지보수 비용이 발생할 수 있음
- **테스트의 어려움**: 모델이 UI와 직접 연결되면, 단위 테스트 작성 시 UI 의존성이 증가할 수 있음
### 결론
저는 기존의 MVVM 패턴에서 뷰모델이 맡는 역할을 최소화하고, "**모델이 곧 뷰다**"라는 관점으로 컴포넌트를 설계하는 방식을 선호합니다. 이를 통해 MVU 스타일의 단순한 데이터 흐름과 결합된 MVVM을 구현할 수 있었으며, 결과적으로 복잡한 UI 계층을 줄이고 직관적인 구조를 만들어낼 수 있었습니다.

이 방식은 특히 프로젝트가 작거나, UI의 특화된 요구사항이 있는 경우 매우 유용합니다. 물론, 재사용성과 유지보수 측면에서는 단점이 있을 수 있으므로, 프로젝트의 규모와 요구사항에 맞게 적절히 선택하는 것이 중요합니다.

---

이 여정을 통해 얻은 인사이트와 경험을 공유하며, 여러분도 자신에게 맞는 최적의 아키텍처를 고민해보시길 바랍니다.
이 글이 여러분에게 도움이 되었길 바랍니다!

---

이 포스트는 MVU에 가까운 MVVM 접근법에 대한 논의와 실제 코드 예제를 바탕으로 작성되었습니다. 장점과 단점을 함께 고려하여, 뷰모델 중심이 아닌, 보다 단순한 데이터 흐름을 추구하는 설계를 소개합니다.