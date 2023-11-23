import { Skeleton, Space } from 'antd'

export const SkeletonPage = () => {
	return (
		<Space.Compact
			block
			direction="vertical"
			className="mx-10 my-20 max-w-2xl gap-5"
		>
			<Skeleton active paragraph={{ rows: 1 }} />

			<Space direction="vertical">
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton.Button active size="large" block />
			</Space>
			<Space direction="vertical">
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton.Button active size="large" block />
			</Space>
			<Space direction="vertical">
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton.Button active size="large" block />
			</Space>
			<Space direction="vertical">
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton.Button active size="large" block />
			</Space>
			<Space direction="vertical">
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton.Button active size="large" block />
			</Space>
			<Space direction="vertical">
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton.Button active size="large" block />
			</Space>
			<Space direction="vertical">
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton.Button active size="large" block />
			</Space>
			<Space direction="vertical">
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton.Button active size="large" block />
			</Space>
			<Space direction="vertical">
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton.Button active size="large" block />
			</Space>
			<Space direction="vertical">
				<Skeleton active paragraph={{ rows: 1 }} />
				<Skeleton.Button active size="large" block />
			</Space>
		</Space.Compact>
	)
}
