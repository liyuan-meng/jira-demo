import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// 查看 React.Component：Component<P, S>，P 代表 props、S 代表 state
// React.Component<{ children: ReactNode, fallbackRender: FallbackRender }, any> 等同于
// React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, any>
// React.PropsWithChildren 和 Partial、Omit 类似，是 React 自己定义的 Utility type
// 查看 PropsWithChildren：type PropsWithChildren<P> = P & { children?: ReactNode | undefined }; & 代表交叉类型
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {
    state = { error: null };

    // 当子组件抛出异常，这里会接收到并执行
    static getDerivedStateFromError(error: Error) {
        // return 返回的值会被赋给 state
        return { error };
    }

    render() {
        const { error } = this.state;
        const { children, fallbackRender } = this.props;

        if (error) {
            return fallbackRender({ error });
        }
        return children;
    }
}
// https://github.com/bvaughn/react-error-boundary
