import { Skeleton, Space } from 'antd'

export const SkeletonPage = () => {
	return (
		<Space.Compact
			block
			direction="vertical"
			className="mx-10 my-20 max-w-2xl gap-5"
		>
         
			
         <Skeleton.Button active size="small" block style={{width:'400px',marginBottom:'10px'}} />
			<Space direction="vertical">
                <Skeleton active paragraph={{ rows: 0 }} />
				<Skeleton.Button active size="large" block />
			</Space>
			<Space  direction="vertical">
				<Skeleton active paragraph={{ rows: 0 }} />
				<Skeleton.Button active size="large" block />
			</Space>
            <Space  direction="vertical">
				<Skeleton active paragraph={{ rows: 0 }} />
				<Skeleton.Button active size="large" block />
			</Space>
            <Space  direction="vertical">
				<Skeleton active paragraph={{ rows: 0 }} />
				<Skeleton.Button active size="large" block />
			</Space>
           
          
		</Space.Compact>
	)
}
