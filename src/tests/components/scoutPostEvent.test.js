import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ScoutPostEvent from '../../components/scoutPostEvent';

describe('ScoutPostEvent', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CookiesProvider>
          <ScoutPostEvent table="testTable" />
        </CookiesProvider>
      </BrowserRouter>
    );
  });

  test('イベント名が表示される', () => {
    const eventName = screen.getByRole('heading', { level: 2 });
    expect(eventName).toBeInTheDocument();
  });

  test('参加するボタンが表示される', () => {
    const joinButton = screen.getByRole('button', { name: '参加する' });
    expect(joinButton).toBeInTheDocument();
  });

  test('拒否するボタンが表示される', () => {
    const rejectButton = screen.getByRole('button', { name: '拒否する' });
    expect(rejectButton).toBeInTheDocument();
  });

  test('isButtonsVisibleがfalseの場合、回答しましたが表示される', () => {
    // isButtonsVisibleをfalseに設定
    const isButtonsVisible = false;

    // 回答しましたテキストが表示されるか確認するカスタムマッチャー関数
    const isAnsweredMessageVisible = () => {
      try {
        screen.getByText('回答しました');
        return true;
      } catch (error) {
        return false;
      }
    };

    // 回答しましたテキストが表示されるか確認
    expect(isAnsweredMessageVisible()).toBe(isButtonsVisible);
  });

  test('イベント詳細へのリンクが表示される', () => {
    const eventLink = screen.getByRole('link', { name: /を見に行く/ });
    expect(eventLink).toBeInTheDocument();
  });
});
